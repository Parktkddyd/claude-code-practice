#!/usr/bin/env bash
# Claude Code hook 이벤트를 Slack으로 전송
set -euo pipefail

if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
  exit 0
fi

input=$(cat)

# jq로 필드 파싱 (hook_event_name은 필수, 나머지는 선택)
hook_event=$(echo "$input" | jq -r '.hook_event_name // "unknown"')
cwd=$(echo "$input" | jq -r '.cwd // ""')
message=$(echo "$input" | jq -r '.message // ""')

# cwd가 빈 문자열이면 현재 디렉토리 사용
cwd="${cwd:-.}"
project=$(basename "$cwd")
timestamp=$(date '+%Y-%m-%d %H:%M:%S')


case "$hook_event" in
  Notification)
    # message가 없으면 기본 메시지 사용
    msg_text="${message:-Claude Code가 입력을 기다리고 있습니다}"
    text="🔔 *[$project]* $msg_text"
    status="⏳ 입력 대기 중"
    ;;
  Stop)
    text="✅ *[$project]* Claude Code 작업이 완료되었습니다"
    status="✅ 작업 완료"
    ;;
  *)
    text="ℹ️ *[$project]* $hook_event"
    status="$hook_event"
    ;;
esac

curl -s -X POST -H 'Content-type: application/json' \
  --data "$(jq -n --arg text "$text" --arg status "$status" --arg ts "$timestamp" '{text: $text, blocks: [{type: "section", text: {type: "mrkdwn", text: $text}}, {type: "context", elements: [{type: "mrkdwn", text: ("*상태:* " + $status + " | *시간:* " + $ts)}]}]}')" \
  "$SLACK_WEBHOOK_URL" > /dev/null 2>&1 || true
