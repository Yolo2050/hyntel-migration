<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

const { locale } = useI18n()
const isKorean = computed(() => locale.value === 'ko')
</script>

<template>
  <div class="wrap" :class="{ 'ko-page': isKorean, 'en-page': !isKorean }" id="wrap">
    <TheHeader />
    <RouterView />
    <TheFooter />
  </div>
</template>

<style>
@import '@/assets/styles/reset.min.css';
@import '@/assets/styles/style.css';
@import '@/assets/styles/style_en.css';
</style>
