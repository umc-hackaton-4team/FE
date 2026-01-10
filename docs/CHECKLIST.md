# UMC 해커톤 FE 평가 체크리스트

## 1. API 연동 완성도 (40점)

### 요청 성공/실패 처리
- [ ] API 요청 성공 시 적절한 데이터 바인딩
- [ ] API 요청 실패 시 에러 메시지 표시
- [ ] 네트워크 에러 처리 (타임아웃, 연결 실패 등)
- [x] 401/403 에러 시 로그인 페이지 리다이렉트 (axios 인터셉터)

### 로딩 상태 UI/UX
- [ ] 페이지 전환 시 로딩 인디케이터
- [ ] API 요청 중 Skeleton UI 또는 Spinner
- [ ] 버튼 클릭 시 로딩 상태 표시 (중복 클릭 방지)

### 사용자 경험 고려
- [ ] Pagination 또는 InfiniteScroll 구현 (목록 페이지)
- [ ] 빈 상태(Empty State) UI
- [ ] 에러 발생 시 재시도 버튼

### Hook 분리
- [x] useAuth 훅 구현
- [x] useAuthRedirect 훅 구현
- [x] useApi 훅 구현 (axios 기반 API 요청 + 로딩/에러 상태)

---

## 2. 공용 컴포넌트 및 폴더 구조 (10점)

### 공용 컴포넌트
- [x] Button 컴포넌트 (variant, size, isLoading 지원)
- [x] OptionBox 컴포넌트
- [x] Input 컴포넌트 (label, error, helperText 지원)
- [ ] Modal 컴포넌트
- [x] Skeleton 컴포넌트
- [x] Spinner 컴포넌트
- [x] Toast 컴포넌트 (Zustand 기반 전역 상태)
- [x] ErrorBoundary 컴포넌트
- [x] ProtectedRoute 컴포넌트 (로그인 필요 페이지 보호)

### 폴더 구조
- [x] api/ - Axios 인스턴스
- [x] components/common/ - 공용 컴포넌트
- [x] components/Layout/ - 레이아웃 컴포넌트
- [x] hooks/ - 커스텀 훅
- [x] pages/ - 페이지 컴포넌트
- [x] store/ - Zustand 스토어
- [x] types/ - TypeScript 타입

### 디자인 시스템
- [x] 컬러 토큰 정의 (Tailwind @theme)
  - primary: #FC8080, primary-light: #FFF8F6
  - main(배경): #FFFCF7
  - gray-1 ~ gray-8
- [x] 타이포그래피 토큰 정의 (@layer components)
  - text-h1 ~ text-h4 (Headings)
  - text-body1, text-body2, text-body2-sb (Body)
  - text-caption1, text-caption2 (Caption)
- [x] Pretendard 폰트 적용

---

## 3. 크로스 브라우징 및 반응형 (10점)

### 반응형
- [x] 모바일 뷰 기본 대응 (max-w-[430px])
- [ ] 태블릿 뷰 대응 (breakpoint 설정)
- [ ] 데스크톱 뷰 대응 (가산점)

### 브라우저 호환성
- [ ] Chrome 테스트
- [ ] Safari 테스트
- [ ] Firefox 테스트 (선택)

---

## 4. 성능 최적화 (20점)

### 중복 요청 방지
- [x] useDebounce 훅 구현 (검색, 입력 최적화)
- [x] useThrottle 훅 구현 (스크롤 이벤트 최적화)
- [ ] API 응답 캐싱

### 리렌더링 최적화
- [x] useCallback 활용 (useApi 훅에서 사용)
- [ ] useMemo 활용
- [ ] React.memo 활용

### 전역 상태 관리
- [x] Zustand 설정
- [x] 인증 상태 전역 관리 (useAuthStore)
- [x] Toast 상태 전역 관리 (useToastStore)
- [x] ProtectedRoute로 라우트 보호 구현

---

## 5. 협업 및 버전 관리 (20점)

### GitHub 활용
- [x] Issue 템플릿 설정
- [x] PR 템플릿 설정
- [ ] 커밋 메시지 컨벤션 준수
- [ ] 코드 리뷰 진행

### 브랜치 전략
- [x] main 브랜치 (배포)
- [x] dev 브랜치 (개발 통합)
- [x] feature 브랜치 전략

---

## 6. 기타 필수 사항

### 배포
- [x] Vercel 배포 완료 (https://goodgame-fe.snowfrost.kr)
- [x] HTTPS 적용

### TypeScript
- [x] TypeScript 사용
- [x] 타입 정의 파일 분리 (types/)
- [ ] any 타입 사용 최소화

### 보안
- [x] .env 파일 .gitignore 확인
- [x] 환경변수 GitHub 미노출 확인

---

## 가산점 항목

- [ ] 데스크톱/태블릿/모바일 각각 별도 레이아웃 (최대 10점)
- [ ] 테스트 코드 작성 (최대 10점)

---

## 현재 진행 상태

### 완료
- [x] 프로젝트 초기 세팅 (React + TS + Vite)
- [x] Tailwind CSS 4 설정
- [x] Zustand 상태 관리
- [x] Axios 인스턴스 설정
- [x] ESLint/Prettier 설정
- [x] 기본 폴더 구조
- [x] Layout 컴포넌트 (Header, Footer)
- [x] 로그인 페이지 (OAuth)
- [x] Vercel 배포
- [x] 디자인 시스템 (컬러, 타이포그래피)
- [x] 공용 컴포넌트 (Button, Input, Skeleton, Spinner, ErrorBoundary)
- [x] Pretendard 폰트 적용
- [x] Toast 컴포넌트 + toastStore
- [x] ProtectedRoute 컴포넌트
- [x] useApi 훅 (axios 기반)
- [x] useDebounce 훅
- [x] useThrottle 훅

### 진행 필요
- [ ] Modal 컴포넌트
- [ ] 로딩 상태 UI 적용
- [ ] API 연동 및 에러 처리
