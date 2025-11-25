<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useData } from 'vitepress'
import { init } from '@waline/client' 
import '@waline/client/style'

const route = useRoute()
const { frontmatter } = useData()
let walineInstance: any = null

const initWaline = () => {
  // 避免在没有评论配置的页面加载
  if (frontmatter.value.comments === false) return

  nextTick(() => {
    const el = document.querySelector('#waline')
    if (el) {
      walineInstance = init({
        el: '#waline',
        // 🚨【关键】：这里填你刚才在 Cloudflare 绑定的二级域名
        serverURL: 'https://comment.merouin.top', 
        dark: 'html.dark', 
      })
    }
  })
}

onMounted(() => {
  initWaline()
})

watch(() => route.path, () => {
  initWaline()
})

onUnmounted(() => {
  if (walineInstance && walineInstance.destroy) {
    walineInstance.destroy()
  }
})
</script>

<template>
  <div class="waline-wrapper">
    <div id="waline"></div>
  </div>
</template>

<style>
.waline-wrapper {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 20px 24px;
}
</style>