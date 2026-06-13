---
name: git-commit
description: 변경사항을 기능 단위별로 쪼개서 단계별 커밋 진행. /git-commit, /git-commit --all, /git-commit --staged 형태로 호출.
---

# git-commit 스킬

변경사항을 **기능 단위별로 쪼개서** 단계별 커밋을 진행하는 스킬입니다.

## 사용 방법

### 대화형 모드 (기본, 권장)

```
/git-commit
```

**프로세스:**
1. `git status --short`로 변경된 파일 목록을 파악합니다
2. 변경사항을 기능 단위로 그룹화합니다
3. 그룹별로:
   - 해당 파일들을 `git add`로 스테이징합니다
   - 한글 커밋메세지를 입력합니다 (`<타입>: <설명>`)
   - `git commit`으로 커밋합니다
4. 모든 변경사항이 커밋될 때까지 반복합니다

### 모든 변경사항 한 번에 커밋

```
/git-commit --all
```

- 모든 변경사항을 `git add .`로 스테이징합니다
- 한글 커밋메세지를 입력합니다
- 바로 커밋합니다

### 스테이징된 파일만 커밋

```
/git-commit --staged
```

- 이미 `git add`된 파일만 대상으로 커밋합니다
- 한글 커밋메세지를 입력합니다

### 도움말 보기

```
/git-commit --help
```

## 커밋메세지 형식

### 기본 형식

```
<타입>: <설명>
```

### 지원하는 타입

| 타입 | 설명 | 예시 |
|------|------|------|
| `feat` | 새 기능 추가 | `feat: 로그인 폼 유효성 검사 추가` |
| `fix` | 버그 수정 | `fix: 로그인 버튼 클릭 오류 수정` |
| `refactor` | 코드 리팩토링 | `refactor: 인증 로직 최적화` |
| `style` | 코드 스타일 변경 | `style: 들여쓰기 일관성 수정` |
| `docs` | 문서 수정 | `docs: 설치 가이드 업데이트` |
| `test` | 테스트 추가/수정 | `test: 로그인 테스트 케이스 추가` |

### 예시

```
feat: 사용자 인증 페이지 구현

fix: 폼 유효성 검사 오류 수정

refactor: 공통 컴포넌트 최적화

docs: README 한국어 번역 완료
```

## 워크플로우 예시

### 여러 기능을 단계별로 커밋하기

1. **변경사항 확인**: `git status --short` 실행
   ```
   M src/components/Button.tsx
   M src/pages/login.tsx
   A src/utils/validation.ts
   M README.md
   ```

2. **첫 번째 커밋: 로그인 페이지 + 버튼 컴포넌트**
   - 파일 1, 2 선택
   - `git add src/components/Button.tsx src/pages/login.tsx`
   - 메시지: `feat: 로그인 페이지 및 버튼 컴포넌트 추가`
   - `git commit -m "feat: 로그인 페이지 및 버튼 컴포넌트 추가"`

3. **두 번째 커밋: 유효성 검사 유틸리티**
   - 파일 3 선택
   - `git add src/utils/validation.ts`
   - 메시지: `feat: 공통 유효성 검사 유틸리티 추가`
   - `git commit -m "feat: 공통 유효성 검사 유틸리티 추가"`

4. **세 번째 커밋: README 업데이트**
   - 파일 4 선택
   - `git add README.md`
   - 메시지: `docs: README 업데이트`
   - `git commit -m "docs: README 업데이트"`

## 특징

✨ **대화형 모드**
- 변경된 파일을 명확히 표시
- 기능 단위로 선택 가능

🌍 **한글 커밋메세지**
- 모든 커밋메세지는 한글로 작성 가능
- 타입은 영문으로 유지하여 일관성 보장

📝 **다양한 모드**
- 대화형 모드 (기본, 권장)
- 모든 변경사항 한 번에 커밋 (`--all`)
- 스테이징된 파일만 커밋 (`--staged`)

## 주의사항

- 커밋메세지는 **필수** 입니다
- `<타입>: <설명>` 형식을 따릅니다
- 한글로 작성 가능합니다
- 각 커밋은 의미있는 기능 단위로 구성됩니다

## 터미널에서 직접 실행하기

프로젝트 루트에서 다음 명령으로 대화형 스크립트를 직접 실행할 수도 있습니다:

```bash
./.claude/commands/git-commit
./.claude/commands/git-commit --all
./.claude/commands/git-commit --staged
./.claude/commands/git-commit --help
```
