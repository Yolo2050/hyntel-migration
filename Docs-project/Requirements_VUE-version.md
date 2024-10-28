# Hyntel Vue.js 마이그레이션 프로젝트 구조

## 1. 프로젝트 설정

```bash
npm init vue@latest hyntel-vue

# 다음 옵션들 선택
✔ Add TypeScript? No
✔ Add JSX Support? No
✔ Add Vue Router? Yes
✔ Add Pinia? Yes
✔ Add Vitest? Yes
✔ Add End-to-End Testing? No
✔ Add ESLint? Yes
✔ Add Prettier? Yes
```

## 2. 프로젝트 구조

- 컴포넌트 구조를 layout/home/common으로 정리
- 불필요한 폴더 제거 (fonts, utils)
- composables에 실제 사용할 함수들 명시
- 한/영 페이지를 별도 뷰로 분리하지 않고 i18n으로 처리

hyntel-vue/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/            # 이미지 파일
│   │   └── styles/           # 스타일 파일
│   │       ├── reset.min.css
│   │       ├── animate.css
│   │       ├── style.css     # 한국어 버전 스타일
│   │       └── style_en.css  # 영어 버전 스타일
│   ├── components/
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   │   ├── TheHeader.vue
│   │   │   └── TheFooter.vue
│   │   ├── home/            # 홈 섹션 컴포넌트
│   │   │   ├── HeroSection.vue    # (kv section)
│   │   │   ├── AboutSection.vue
│   │   │   ├── MissionSection.vue
│   │   │   ├── TeamSection.vue
│   │   │   ├── AlgorithmSection.vue
│   │   │   ├── NewsSection.vue
│   │   │   └── ContactSection.vue
│   │   └── common/          # 공통 컴포넌트
│   │       ├── LanguageSwitch.vue
│   │       └── ScrollTopButton.vue
│   ├── composables/         # 컴포지션 함수
│   │   ├── useAnimation.js  # 애니메이션 관련 로직
│   │   ├── useSlider.js    # 슬라이더 관련 로직
│   │   └── useScroll.js    # 스크롤 관련 로직
│   ├── views/
│   │   └── HomeView.vue    # 메인 페이지 (한/영 공통)
│   ├── router/
│   │   └── index.js       # 라우팅 설정
│   ├── stores/            # Pinia 스토어
│   │   └── lang.js       # 언어 설정 관리
│   ├── i18n/             # 다국어 처리
│   │   ├── index.js
│   │   ├── ko.json
│   │   └── en.json
│   ├── App.vue
│   └── main.js
├── vite.config.js
├── vitest.config.js
├── .eslintrc.js
├── .prettierrc
└── package.json

## 3. 주요 의존성 패키지

package.json

```json
{
  "dependencies": {
    "@vueuse/core": "^11.1.0",
    "pinia": "^2.2.4",
    "vue": "^3.5.12",
    "vue-i18n": "^10.0.4",
    "vue-router": "^4.4.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vitest/eslint-plugin": "1.1.7",
    "@vue/eslint-config-prettier": "^10.0.0",
    "@vue/test-utils": "^2.4.6",
    "eslint": "^9.13.0",
    "eslint-plugin-vue": "^9.29.0",
    "jsdom": "^25.0.1",
    "prettier": "^3.3.3",
    "vite": "^5.4.10",
    "vite-plugin-vue-devtools": "^7.5.3",
    "vitest": "^2.1.3"
  }
}
```

### 참고사항

#### @vueuse/core (Vue Composition API 유틸리티 컬렉션)

- useMediaQuery (반응형 디자인)
- useScroll (스크롤 이벤트 처리)
- useLocalStorage (로컬 스토리지 관리)
- 기타 여러 유틸리티 함수들

#### vue-i18n (다국어 처리)

- 언어 전환 구현
- 동적 라우팅과 연동

## 4. 주요 기능 구현 방법

### 4.1 애니메이션 처리 (@vueuse/core)

```javascript
// composables/useAnimation.js
import { useIntersectionObserver } from '@vueuse/core'

export function useAnimation(options = {}) {
  const target = ref(null)
  const isVisible = ref(false)

  useIntersectionObserver(target, ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
  }, options)

  return {
    target,
    isVisible
  }
}
```

### 4.2 슬라이더 구현 (@vueuse/core)

```javascript
// composables/useSlider.js
import { useSlider, useSwipe } from '@vueuse/core'

export function useNewsSlider(items) {
  const container = ref(null)
  const { currentSlide, slideTo, next, prev } = useSlider({
    total: items.length,
    loop: true
  })

  const { isSwiping } = useSwipe(container, {
    onSwipeEnd(e, direction) {
      if (direction === 'left') next()
      if (direction === 'right') prev()
    }
  })

  return {
    container,
    currentSlide,
    slideTo,
    next,
    prev,
    isSwiping
  }
}
```

### 4.3 다국어 처리 (vue-i18n)

```javascript
// i18n/index.js
import { createI18n } from 'vue-i18n'
import ko from './ko.json'
import en from './en.json'

export default createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages: { ko, en }
})

// stores/lang.js
import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', {
  state: () => ({
    currentLang: 'ko'
  }),
  actions: {
    setLang(lang) {
      this.currentLang = lang
      document.documentElement.lang = lang
    }
  }
})
```

## 5. 마이그레이션 가이드

### 5.1 jQuery 의존성 제거

- jQuery 이벤트 핸들러를 Vue의 이벤트 시스템으로 변경
- DOM 조작은 ref와 템플릿 문법 사용
- 애니메이션은 Vue의 transition 컴포넌트 활용

```javascript
// 예시: jQuery 스크롤 이벤트를 Vue Composable로 변환
import { ref, onMounted, onUnmounted } from 'vue'
export function useScroll() {
const scrollPosition = ref(0)
const isNavFixed = ref(false)
const handleScroll = () => {
scrollPosition.value = window.scrollY
isNavFixed.value = scrollPosition.value > 100
}
onMounted(() => {
window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
window.removeEventListener('scroll', handleScroll)
})
return {
scrollPosition,
isNavFixed
}
}
```

### 5.2 반응형 디자인

- CSS 미디어 쿼리 유지
- Composition API의 reactive 속성 활용
- `@vueuse/core`의 useMediaQuery 활용

```javascript
import { useMediaQuery } from '@vueuse/core'
export function useResponsive() {
const isMobile = useMediaQuery('(max-width: 768px)')
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
const isDesktop = useMediaQuery('(min-width: 1025px)')
return {
isMobile,
isTablet,
isDesktop
}
}
```

### 5.3 다국어 처리

- vue-i18n을 사용한 언어 전환 구현
- 동적 라우팅과 연동

```javascript
// i18n/index.ts
import { createI18n } from 'vue-i18n'
import ko from './ko.json'
import en from './en.json'
export default createI18n({
legacy: false,
locale: 'ko',
fallbackLocale: 'en',
messages: {
ko,
en
}
})
```

### 5.4 성능 최적화

- 컴포넌트 지연 로딩 적용
- 이미지 최적화
- 메모이제이션 활용

```javascript
// router/index.ts
import { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
{
path: '/',
component: () => import('../views/HomePage.vue')
},
{
path: '/en',
component: () => import('../views/EnglishPage.vue')
}
]
```

## 6. 테스트 전략

- Vitest를 사용한 단위 테스트
- 컴포넌트 테스트는 @vue/test-utils 활용

```javascript
// components/tests/AppHeader.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../common/AppHeader.vue'
describe('AppHeader', () => {
it('renders properly', () => {
const wrapper = mount(AppHeader)
expect(wrapper.exists()).toBe(true)
})
})
```

## 7. 배포 고려사항

- Vite 빌드 최적화
- 정적 에셋 CDN 활용
- SEO 대응을 위한 메타 태그 관리
- 성능 모니터링

## 8. 개발 가이드라인

- Vue 3 Composition API 사용
- 컴포넌트 재사용성 고려
- CSS 모듈화 및 변수 활용
- Git 커밋 컨벤션 준수
