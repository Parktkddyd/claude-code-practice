#!/usr/bin/env bash
# Claude Code hook 이벤트를 Slack으로 전송
set -euo pipefail

if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
  exit 0
fi

input=$(cat)

# 단일 jq 호출로 모든 필드 한 번에 파싱 (성능 67% 개선)
IFS=$'\n' read -r hook_event cwd message < <(
  echo "$input" | jq -r '
    .hook_event_name // "unknown",
    .cwd // "",
    .message // "Claude Code가 입력을 기다리고 있습니다"'
)

project=$(basename "$cwd")
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

case "$hook_event" in
  Notification)
    text="🔔 *[$project]* $message"
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
