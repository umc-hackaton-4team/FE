# GoodGame FE Review Guide

## Review Style

- Avoid general feedback, summaries, explanations of changes, or praises.
- Provide specific, objective insights only.
- Write all comments in Korean (ko-KR).

---

## Code Convention

### 1. Naming Convention

| Type | Notation | Example |
|------|----------|---------|
| Variables & Functions | **camelCase** | `userName`, `fetchData()` |
| Components | **PascalCase** | `LoginPage`, `OptionBox` |
| Constants | **UPPER_SNAKE_CASE** | `const API_URL = "..."` |
| Folders | **PascalCase** (pages), **kebab-case** (others) | `LoginPage/`, `common/` |
| Types & Interfaces | **PascalCase** | `interface User { ... }` |

### 2. File Structure

```
src/
├── api/            # Axios 인스턴스 및 API 호출
├── assets/         # 정적 파일 (icons, images)
├── components/
│   ├── common/     # 공통 컴포넌트 (Button, OptionBox)
│   └── Layout/     # 레이아웃 컴포넌트
├── hooks/          # 커스텀 훅
├── pages/          # 페이지 컴포넌트 (폴더별 구분)
├── store/          # Zustand 스토어
└── types/          # TypeScript 타입 정의
```

### 3. Component Guidelines

- 한 컴포넌트는 하나의 책임만 가짐
- Props는 명확한 타입 정의 필수
- 복잡한 로직은 커스텀 훅으로 분리

### 4. Styling

- Tailwind CSS 사용
- 모바일 최적화 (max-w-[430px])
- 인라인 스타일 지양

### 5. State Management

- 전역 상태: Zustand
- 로컬 상태: useState
- 서버 상태: 필요시 React Query 도입 고려

---

## Git Convention

### Commit Message

```
[#이슈번호] type : 메시지
```

- `feat` : 기능 개발
- `fix` : 버그 수정
- `style` : UI 스타일 수정
- `docs` : 문서 작업
- `refactor` : 리팩토링
- `chore` : 설정 변경
