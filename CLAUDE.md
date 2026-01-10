# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

- **프로젝트명**: GoodGame FE (UMC 해커톤 4팀)
- **기술 스택**: React 19, TypeScript, Vite, Tailwind CSS 4, Zustand, React Router DOM 7
- **패키지 매니저**: pnpm
- **배포**: https://goodgame-fe.snowfrost.kr (Vercel, main 브랜치)

## 명령어

```bash
pnpm dev      # 개발 서버 (Vite)
pnpm build    # TypeScript 컴파일 + Vite 빌드
pnpm lint     # ESLint 실행
pnpm format   # Prettier 포맷팅
pnpm preview  # 빌드된 결과물 미리보기
```

## 아키텍처

### 라우팅 구조 (React Router DOM)
- `Layout` 컴포넌트가 Header/Footer를 감싸고 `Outlet`으로 페이지 렌더링
- 모바일 최적화 레이아웃 (max-w-[430px])
- 주요 라우트: `/` (홈), `/login`, `/auth/callback` (OAuth), `/pick` (설문)

### 상태 관리 (Zustand)
- `useAuthStore`: 인증 상태 (accessToken, refreshToken, isAuthenticated)
- localStorage persist 미들웨어 사용 (`auth-storage` 키)

### API 설정 (src/api/axios.ts)
- 기본 URL: `https://goodgame.snowfrost.kr/api`
- Request 인터셉터: Authorization 헤더에 Bearer 토큰 자동 추가
- Response 인터셉터: 401 에러 시 토큰 자동 갱신 (refresh 토큰 사용)

## 디렉토리 구조

```
src/
├── api/            # Axios 인스턴스 및 API 설정
├── assets/icons/   # SVG 아이콘
├── components/
│   ├── common/     # Button, OptionBox 등 공통 컴포넌트
│   └── Layout/     # Header, Footer, Layout
├── hooks/          # useAuth, useAuthRedirect 등 커스텀 훅
├── pages/          # 페이지 컴포넌트 (폴더별 구분)
├── store/          # Zustand 스토어
└── types/          # TypeScript 타입 정의
```

## 커밋 메시지 규칙

**절대로 커밋 메시지에 다음을 포함하지 마세요:**
- `🤖 Generated with Claude Code`
- `Co-Authored-By: Claude`
- AI가 생성했다는 어떤 표시도 금지

**형식:**
```
[#이슈번호] type : 메시지
```

**타입:**
- `feat` : 기능 개발
- `fix` : 버그 수정
- `style` : UI 스타일 수정 (기능 변경 없음)
- `docs` : 문서 작업
- `refactor` : 리팩토링 (기능 변경 없음)
- `chore` : 설정 변경, 파일 이동 등

**예시:**
- `[#12] feat : 로그인 페이지 UI 구현`
- `[#8] fix : 회원가입 시 상태 코드 오류 수정`

## 브랜치 전략

- `main` : 배포용 (dev에서 병합)
- `dev` : 개발 통합 (feature 브랜치들이 병합되는 곳)
- `feature/#이슈번호-기능명` : 신규 기능 (dev에서 분기)
- `fix/#이슈번호-기능명` : 버그 수정 (dev에서 분기)
- `hotfix/#이슈번호-기능명` : 긴급 수정 (main에서 분기 → main, dev 모두 병합)
