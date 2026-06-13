# git-commit 스킬 인식 문제 해결 계획

## Context (배경)

`.claude/skills/git-commit.sh`라는 셸 스크립트가 존재하지만 `/git-commit` 슬래시 커맨드(스킬)로 실행되지 않는다는 문제가 발생했다.

**원인**: Claude Code의 Skill 시스템은 다음 구조를 요구한다.

```
.claude/skills/<skill-name>/SKILL.md
```

즉, 스킬은 **디렉터리 안의 `SKILL.md` 파일**(YAML frontmatter로 `name`, `description` 포함)로 정의되어야 Claude Code가 인식하고 `/`로 호출할 수 있다. 현재는 `.claude/skills/git-commit.sh`라는 **단일 셸 스크립트 파일**만 존재하기 때문에 Claude Code가 이를 스킬로 로드하지 못한다.

또한 `.claude/commands/git-commit`도 디렉터리가 아닌 단일 실행 파일로 되어 있어, 표준 커스텀 슬래시 커맨드(`*.md` 파일) 형식과도 다르다. 다만 이번 작업의 핵심 목표는 "스킬로 인식되게 하는 것"이므로 `commands/git-commit`은 셸에서 직접 실행하는 보조 스크립트로 그대로 두고, `GIT_COMMIT_GUIDE.md`의 설명만 갱신한다.

## 변경 사항

### 1. `.claude/skills/git-commit/SKILL.md` 신규 생성

- YAML frontmatter:
  ```yaml
  ---
  name: git-commit
  description: 변경사항을 기능 단위별로 쪼개서 단계별 커밋 진행. /git-commit, /git-commit --all, /git-commit --staged 형태로 호출.
  ---
  ```
- 본문에는 기존 `git-commit.sh`의 동작(대화형 모드, `--all`, `--staged`, `--help`)을 Claude가 따라야 할 절차로 기술:
  - 1) `git status --short`로 변경사항 파악
  - 2) 기능 단위로 파일을 그룹화
  - 3) 그룹별로 `git add`, 한글 커밋메세지(`<타입>: <설명>`) 작성, `git commit`
  - 4) 모든 변경사항이 커밋될 때까지 반복
  - 커밋 타입 표(`feat`, `fix`, `refactor`, `style`, `docs`, `test`) 포함
  - `--all` / `--staged` / `--help` 옵션에 대한 동작 설명 포함
- 기존 `git-commit.sh`의 색상 코드, 대화형 `read` 입력 로직은 Claude가 직접 실행하는 스킬이므로 불필요 — Claude가 git 명령을 직접 수행하도록 절차 중심으로 재작성한다.

### 2. `.claude/skills/git-commit.sh` 처리

- SKILL.md로 로직이 이전되므로 더 이상 필요 없는 중복 파일. 삭제한다.
- (단, `.claude/commands/git-commit`은 사람이 터미널에서 직접 실행하는 대화형 스크립트로 유지 — 별도 용도이므로 손대지 않음)

### 3. `.claude/GIT_COMMIT_GUIDE.md` 업데이트

- "위치" 섹션의 디렉터리 트리를 새 구조로 수정:
  ```
  .claude/
  ├── commands/
  │   └── git-commit          # 터미널에서 직접 실행하는 대화형 스크립트
  └── skills/
      └── git-commit/
          └── SKILL.md         # Claude Code 스킬 (/git-commit)
  ```
- "스킬로:" 부분 설명은 그대로 유지 (`/git-commit`, `/git-commit --all`, `/git-commit --staged`)

## 검증 방법

1. `.claude/skills/git-commit/SKILL.md`가 올바른 frontmatter(`name`, `description`)를 가지는지 확인
2. Claude Code 세션에서 `/git-commit` 입력 시 스킬 목록에 노출되고 호출되는지 확인 (현재 세션에서 직접 테스트 가능)
3. `--all`, `--staged`, `--help` 시나리오에 대한 절차가 SKILL.md에 명확히 기술되어 있는지 검토
