<img alt="Image" src="https://github.com/user-attachments/assets/7e8885e2-0bed-43d1-83c8-353774a145a8" />

<br>

# 🍬 BONBON

BONBON은 일상의 소소한 행복을 '사탕'이라는 오브젝트로 시각화하여 기록하고, 개인의 상태에 맞는 행복 미션을 추천받을 수 있는 행복 아카이빙 웹 서비스입니다. <br>
사용자는 직관적인 UI를 통해 자신의 감정을 기록하며, 캘린더를 통해 모아진 행복 사탕들을 한눈에 확인할 수 있습니다.

## 📂 폴더 구조 (Directory Structure)
```
src
├── 📂 api           # Axios 인스턴스 및 API 호출 함수 모음
├── 📂 assets        # 이미지, 폰트, 아이콘 리소스
├── 📂 components    # 재사용 가능한 공통 컴포넌트 (Button, Input 등)
├── 📂 hooks         # 커스텀 훅 (useUser, useDebounce 등)
├── 📂 pages         # 라우팅 단위의 페이지 컴포넌트
├── 📂 types         # TypeScript 타입 정의 인터페이스
├── 📂 utils         # 날짜 변환 등 공통 유틸리티 함수
├── App.tsx          # 라우팅 및 전역 설정
└── main.tsx         # 진입점
```

## 🔐 보안 및 인증 처리
JWT 핸들링
Axios Interceptor를 설정하여 모든 API 요청 헤더에 자동으로 Access Token을 주입합니다.

토큰 만료 시 Refresh Token을 사용해 자동으로 재발급받는 로직을 구현하여 끊김 없는 사용자 경험을 제공합니다.

justand 활용하여 토큰을 안전하게 관리합니다.


## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| Core | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" height="25"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" height="25"> |
| Build | <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" height="25"> |
| Styling | <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" height="25"> |
| Network | <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" height="25"> |
| Global State | <img src="https://img.shields.io/badge/Zustand-543818?style=flat-square&logo=react&logoColor=white" height="25"> |
| Auth | <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" height="25"> |

# 🔄 개발 워크플로우

## 🌿 브랜치 전략

Git Flow를 기반으로 하며, 다음과 같은 브랜치 형식을 따릅니다.

- **Main Branch**
  - 배포 가능한 상태의 코드를 유지합니다.
  - 이 브랜치에 push 되면 vercel로 자동 배포(CD)가 진행됩니다.
- **Dev**
  개발 중인 버전 (Main Merge 전 단계)
	
- **feature/#이슈번호-기능명 : 신규 기능 개발 브랜치**
  - dev 브랜치에서 분기되어 기능 단위로 개발
  - 개발 완료 후 dev로 병합
  - 브랜치명은 kebab-case 사용
	- 예) feature/#1-get-user


# 👥 팀원 및 팀 소개

| [왕휘도] | [최지우] | [김덕환] |
|:------:|:------:|:------:|
| <img src="https://avatars.githubusercontent.com/kingluminance" width="100px;" alt="kingluminance"/> | <img src="https://avatars.githubusercontent.com/Choijiw00" width="100px;" alt="Choijiw00"/> | <img src="https://avatars.githubusercontent.com/IISweetHeartII" width="100px;" alt="IISweetHeartII"/> |
| FE | FE | FE |
| [GitHub](https://github.com/kingluminance) | [GitHub](https://github.com/Choijiw00) | [GitHub](https://github.com/IISweetHeartII) |
