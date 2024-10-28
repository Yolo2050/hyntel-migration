<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

// i18n 설정
const { t, locale } = useI18n()

// 반응형 상태 관리
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// 메뉴 아이템 데이터 - computed로 변경하여 실제 사용되게 함
const menuItems = computed(() => [
  { key: 'about', label: t('nav.about'), target: '.about' },
  { key: 'team', label: t('nav.team'), target: '.team' },
  { key: 'algorithm', label: t('nav.algorithm'), target: '.algorithm' },
  { key: 'news', label: t('nav.news'), target: '.news' },
  { key: 'contact', label: t('nav.contact'), target: '.contact' }
])

// 언어 옵션 정의
const languages = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' }
]

// 메서드
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollToSection = (target) => {
  const element = document.querySelector(target)
  if (element) {
    const headerHeight = 80
    const targetPosition = element.offsetTop - headerHeight
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
    isMenuOpen.value = false
  }
}

const switchLanguage = (lang) => {
  locale.value = lang
  toggleMenu() // 언어 변경 시 모바일 메뉴 닫기
}

// 스크롤 이벤트 감지
onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})
</script>

<template>
  <header :class="['header', { 'is-scrolled': isScrolled }]">
    <div class="inner_2000">
      <nav class="nav_box">
        <!-- 로고 -->
        <router-link to="/" class="logo">
          <img src="@/assets/img/logo_pc.jpg" alt="HYNTEL" class="pc-logo" />
          <img src="@/assets/img/logo_mo.png" alt="HYNTEL" class="mobile-logo" />
        </router-link>

        <!-- 메인 메뉴 -->
        <div class="menu-container">
          <ul :class="['gnb_box', { 'is-active': isMenuOpen }]">
            <li v-for="item in menuItems" 
                :key="item.key"
                @click="scrollToSection(item.target)">
              <a href="#" @click.prevent>{{ item.label }}</a>
            </li>
          </ul>
        </div>

        <!-- 언어 선택 부분 수정 -->
        <div class="lang_box">
          <template v-for="(lang, index) in languages" :key="lang.code">
            <a href="#" 
               :class="{ 'active': locale === lang.code }"
               @click.prevent="switchLanguage(lang.code)">
              {{ lang.label }}
            </a>
            <span v-if="index < languages.length - 1" class="divider"> | </span>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  background: #fff;
}

.inner_2000 {
  max-width: 2000px;
  margin: 0 auto;
  padding: 0 40px;
}

.nav_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  padding: 0 20px;
}

.logo {
  width: 180px;  /* 로고 크기 조정 */
}

.logo img {
  width: 100%;
  height: auto;
}

.menu-container {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-left: 100px;  /* 로고와의 간격 */
}

.gnb_box {
  display: flex;
  align-items: center;
  gap: 60px;  /* 메뉴 간격 증가 */
}

.gnb_box li a {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  text-transform: uppercase;  /* 대문자로 변경 */
  letter-spacing: 0.5px;
}

.lang_box {
  display: flex;
  align-items: center;
  margin-left: 60px;
}

.lang_box a {
  font-size: 16px;
  color: #666;
  text-decoration: none;
  padding: 0 5px;
}

.lang_box a.active {
  color: #333;
  font-weight: 500;
}

.lang_box .divider {
  color: #666;
  margin: 0 5px;
}

.mobile-logo {
  display: none;
}

@media (max-width: 768px) {
  /* 모바일 스타일 유지 */
}
</style>
