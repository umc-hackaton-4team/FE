# CLAUDE.md

이 파일은 Claude Code가 프로젝트를 이해하고 협업하기 위한 가이드입니다.

## 프로젝트 개요

- **프로젝트명**: GoodGame FE
- **기술 스택**: React 19, TypeScript, Vite, Tailwind CSS, Zustand
- **패키지 매니저**: npm

## 커밋 메시지 규칙

**절대로 커밋 메시지에 다음을 포함하지 마세요:**
- `🤖 Generated with Claude Code`
- `Co-Authored-By: Claude`
- AI가 생성했다는 어떤 표시도 금지

**커밋 메시지 형식:**
```
[#이슈번호] type : 메시지
```

**커밋 타입:**
- `feat` : 기능 개발
- `fix` : 버그 수정
- `style` : UI 스타일 수정
- `docs` : 문서 작업
- `refactor` : 리팩토링
- `chore` : 설정 변경, 파일 이동 등

**예시:**
- `[#12] feat : 로그인 페이지 UI 구현`
- `[#8] fix : 회원가입 시 상태 코드 오류 수정`

## 브랜치 전략

- `main` : 배포용
- `dev` : 개발 통합
- `feature/#이슈번호-기능명` : 기능 개발
- `fix/#이슈번호-기능명` : 버그 수정
- `hotfix/#이슈번호-기능명` : 긴급 수정

## 주요 디렉토리 구조

```
src/
├── pages/          # 페이지 컴포넌트
├── components/     # 공통 컴포넌트
├── hooks/          # 커스텀 훅
├── stores/         # Zustand 스토어
└── assets/         # 정적 파일
```

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 빌드
npm run lint     # 린트
```
