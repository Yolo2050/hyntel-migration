# 하인텔(Hyntel) 웹사이트 구조 (리팩토링)

## 1. 프로젝트 구조

html-version/
├── assets/
│ ├── styles/                  # 스타일 파일들
│ │ ├── base/               # 기본 스타일
│ │ │ └── variables.css
│ │ ├── components/         # 컴포넌트 스타일
│ │ │ └── header.css
│ │ ├── fonts/              # 폰트
│ │ ├── sections/           # 섹션별 스타일
│ │ ├── animate.css         # 애니메이션
│ │ ├── reset.min.css       # CSS 초기화
│ │ ├── style.css          # 한국어 스타일
│ │ └── style_en.css       # 영어 스타일
│ └── img/                    # 이미지 리소스
├── js/
│ ├── components/         # 컴포넌트
│ │ ├── Anchor.js      # 앵커 이벤트 처리
│ │ ├── Floating.js    # 플로팅 배너
│ │ ├── Header.js      # 헤더 & 네비게이션
│ │ ├── Navigation.js  # 네비게이션 기능
│ │ ├── Swiper.js      # 슬라이더 관리
│ │ └── Toggle.js      # 토글 기능
│ ├── lib/               # 외부 라이브러리
│ │ └── wow.min.js     # WOW 애니메이션
│ ├── utils/             # 유틸리티
│ │ ├── constants.js   # 상수 정의
│ │ └── scroll.js      # 스크롤 관련 함수
│ └── main.js            # 메인 진입점
├── index.html                  # 한국어 페이지
└── en.html                     # 영어 페이지
