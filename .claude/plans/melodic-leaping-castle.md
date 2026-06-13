# Slack 웹훅을 통한 Claude Code 알림 설정

## Context
현재 `.claude/settings.json`에는 `Notification` 이벤트에 대해 `notify-send`(데스크탑 알림)만 설정되어 있습니다. 사용자는 Claude Code가 **(1) 권한을 요청할 때**와 **(2) 작업이 완료되었을 때** Slack 모바일 앱으로 알림을 받고자 합니다.

- 권한 요청 시점 → `Notification` hook 이벤트로 처리 (Claude가 입력 대기/권한 확인이 필요할 때 발생)
- 작업 완료 시점 → `Stop` hook 이벤트로 처리 (Claude가 응답을 마치고 멈출 때 발생)

Slack Incoming Webhook URL은 아직 생성되지 않았으므로, 먼저 생성 가이드를 제공하고, 보안을 위해 URL은 `settings.json`에 직접 적지 않고 **환경변수(`SLACK_WEBHOOK_URL`)**로 관리합니다. 적용 범위는 현재 프로젝트(`.claude/settings.json`)로 한정합니다.

## 1단계: Slack Incoming Webhook 생성 안내 (사용자 작업)
플랜 승인 후, 사용자에게 다음 절차를 안내합니다 (Claude가 대신 수행할 수 없는 외부 작업):
1. https://api.slack.com/apps 접속 → "Create New App" → "From scratch"
2. 앱 이름 입력(예: `Claude Code Notifier`), 알림 받을 워크스페이스 선택
3. 좌측 메뉴 "Incoming Webhooks" → 활성화(On으로 토글)
4. "Add New Webhook to Workspace" 클릭 → 알림 받을 채널(예: 본인 DM 또는 전용 채널) 선택 후 허용
5. 생성된 Webhook URL(`https://hooks.slack.com/services/...`) 복사
6. Slack 모바일 앱에서 해당 채널/DM의 알림이 켜져 있는지 확인 (워크스페이스 알림 설정에서 "모든 새 메시지" 권장)

## 2단계: 환경변수 설정 (사용자 작업, Claude가 안내)
`~/.bashrc` 또는 `~/.zshrc`에 추가:
```bash
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/XXXX/XXXX/XXXX"
```
이후 `source ~/.bashrc` 적용. (Claude가 직접 셸 프로필에 시크릿을 쓰는 것은 사용자 확인 후 진행하거나, 사용자가 직접 추가하도록 명령어만 안내)

## 3단계: 알림 스크립트 작성
`.claude/scripts/notify-slack.sh` 생성 — stdin으로 들어오는 hook JSON을 파싱하여 메시지 구성 후 Slack에 POST.

```bash
#!/usr/bin/env bash
# Claude Code hook 이벤트를 Slack으로 전송
set -euo pipefail

if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
  exit 0
fi

input=$(cat)
hook_event=$(echo "$input" | jq -r '.hook_event_name // "unknown"')
cwd=$(echo "$input" | jq -r '.cwd // ""')
project=$(basename "$cwd")

case "$hook_event" in
  Notification)
    message=$(echo "$input" | jq -r '.message // "Claude Code가 입력을 기다리고 있습니다"')
    text="🔔 *[$project]* $message"
    ;;
  Stop)
    text="✅ *[$project]* Claude Code 작업이 완료되었습니다"
    ;;
  *)
    text="ℹ️ *[$project]* $hook_event"
    ;;
esac

curl -s -X POST -H 'Content-type: application/json' \
  --data "$(jq -n --arg text "$text" '{text: $text}')" \
  "$SLACK_WEBHOOK_URL" > /dev/null
```

실행 권한 부여: `chmod +x .claude/scripts/notify-slack.sh`

## 4단계: `.claude/settings.json` 수정
기존 `notify-send` 훅은 유지(데스크탑 알림도 계속 받고 싶을 가능성)하고, Slack 알림 훅을 `Notification`과 `Stop` 이벤트에 추가합니다.

```json
{
  "enabledMcpjsonServers": ["playwright"],
  "enableAllProjectMcpServers": true,
  "plansDirectory": ".claude/plans",
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": "notify-send 'Claude Code' 'Claude가 기다리는 중'" },
          { "type": "command", "command": "bash .claude/scripts/notify-slack.sh" }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": "bash .claude/scripts/notify-slack.sh" }
        ]
      }
    ]
  }
}
```

- `update-config` 스킬을 사용하여 settings.json 변경을 진행 (프로젝트 규칙상 설정 변경은 해당 스킬 경유)

## 5단계: 검증
1. `jq`, `curl` 설치 여부 확인 (`which jq curl`)
2. `SLACK_WEBHOOK_URL` 환경변수 적용 후, 스크립트를 수동 테스트:
   ```bash
   echo '{"hook_event_name":"Notification","message":"테스트 알림","cwd":"'$(pwd)'"}' | bash .claude/scripts/notify-slack.sh
   ```
   → Slack 모바일 앱에 메시지 도착 확인
3. `echo '{"hook_event_name":"Stop","cwd":"'$(pwd)'"}' | bash .claude/scripts/notify-slack.sh` 로 완료 알림 테스트
4. 실제로 Claude Code에서 권한이 필요한 작업을 수행해 Notification 훅이 발동하는지, 응답 종료 시 Stop 훅이 발동하는지 확인

## 변경 파일 요약
- 신규: `.claude/scripts/notify-slack.sh`
- 수정: `.claude/settings.json` (hooks.Notification에 항목 추가, hooks.Stop 신규 추가)
- 사용자 작업: Slack Webhook 생성, `SLACK_WEBHOOK_URL` 환경변수 등록
