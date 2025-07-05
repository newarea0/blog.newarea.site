<script setup lang="ts">
import Giscus from '@giscus/vue'

// const { page } = useData()
</script>

<template>
  <!-- :key="page.filePath" -->
  <Giscus
    id="comments"
    repo="newarea0/giscus-comments"
    repo-id="R_kgDOPHGu9g"
    category="Announcements"
    category-id="DIC_kwDOPHGu9s4CsfZ5"
    mapping="pathname"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    theme="preferred_color_scheme"
    lang="zh-CN"
    loading="lazy"
  />
</template>
