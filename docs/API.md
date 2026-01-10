# API 문서

> 백엔드 API 연동 가이드

---

## 서비스 개요

- **서비스명**: 행복 저금통
- **설명**: 행복했던 순간을 기록하고 다시 보는 다이어리 서비스
- **로그인**: 구글 소셜 로그인
- **핵심 기능**: 행복 기록 작성 (텍스트 1000자 + 이미지 4개)
- **AI 추천**: 기존 기록 기반 다음날 할 일 추천 (Gemini 2.5 Flash-Lite)

---

## Base URL

```
https://goodgame.snowfrost.kr/api
```

---

## API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| `POST` | `/auth/google` | 구글 로그인 |
| `GET` | `/users/me` | 내 정보 조회 |
| `POST` | `/memories` | 행복 기록 생성 (content + images) |
| `GET` | `/memories` | 내 기록 목록 조회 |
| `GET` | `/memories/{id}` | 기록 상세 조회 |
| `PUT` | `/memories/{id}` | 기록 수정 |
| `DELETE` | `/memories/{id}` | 기록 삭제 |
| `POST` | `/conditions` | 오늘 상태 저장 → AI 추천 자동 생성 |
| `GET` | `/recommendations` | AI 추천 (신규유저: default) |

---

## 데이터 타입

### EnergyLevel (에너지 레벨)
| 값 | 설명 |
|-----|------|
| `DEPLETED` | 방전 직전 (10%) |
| `NORMAL` | 보통 (50%) |
| `FULL` | 풀충전 (100%) |

### AvailableTime (가용 시간)
| 값 | 설명 |
|-----|------|
| `SHORT` | 틈새 시간 (10분 이내) |
| `MODERATE` | 적당한 여유 (1시간 내외) |
| `HALF_DAY` | 반나절 이상 |

### SpendingLevel (소비 규모)
| 값 | 설명 |
|-----|------|
| `FREE` | 무지출/소액 |
| `LIGHT` | 기분 전환용 지출 |
| `HEAVY` | 통 큰 보상 |

### ActivityLocation (활동 환경)
| 값 | 설명 |
|-----|------|
| `HOME` | 집 안 |
| `OUTSIDE` | 집 밖 |

---

## AI 추천 플로우

```
[설문 페이지] 사용자 상태 입력
    │
    ▼
POST /conditions (상태 저장)
    │
    ├─ user_conditions에 저장
    │
    ▼
자동으로 AI 호출 (Gemini 2.5 Flash-Lite)
    │
    ├─ Input: 기존 일기 + 오늘 상태
    ├─ Output: 추천 목록
    │
    ▼
user_recommendations에 저장
    │
    ▼
[홈 페이지] GET /recommendations
    │
    ├─ [신규 유저] → 기본 추천 반환
    └─ [기존 유저] → AI 추천 반환
```

---

## 참고

- 상세 ERD 및 Entity 정의는 [BE/docs/ERD.md](../../BE/docs/ERD.md) 참고
