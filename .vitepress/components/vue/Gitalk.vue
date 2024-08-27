<script setup lang="ts">
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import { nextTick, onMounted } from 'vue'

let pathname = decodeURI(window.location.pathname)
if (pathname.length > 48) {
  pathname = pathname.slice(-48)
}
const commentConfig: Record<string, any> = {
  // 是否开启
  enable: true,
  // clientID
  clientID: 'Ov23liiWc8rjOJr4ix9p',
  // clientSecret
  clientSecret: '2666e4f3a0e078acb19905e1c0eb30789fbabbcc',
  // 评论项目名
  repo: 'gitalk-comments',
  owner: 'stormzhangbx',
  admin: ['stormzhangbx'],
  githubID: 'stormzhangbx',
  id: pathname,
  language: 'zh-CN',
  distractionFreeMode: true,
}

onMounted(() => {
  try {
    // @ts-ignore
    const gitalk = new Gitalk(commentConfig)

    // nextTick(() => {
    gitalk.render('gitalk-container')
    // })
  }
  catch (error) {
    console.log('gitalk render fail.', error)
  }
})
</script>

<template>
  <div id="gitalk-container" />
</template>

<style>
.gt-container .gt-header-textarea {
  color: #000;
}
.gt-container.gt-input-focused:after {
  content: "";
  position: fixed;
  bottom: 0%;
  left: 0;
  right: 0;
  top: 0;
  background: transparent !important;
  opacity: 0.6;
  -webkit-transition: opacity 0.3s, bottom 0s;
  transition: opacity 0.3s, bottom 0s;
  z-index: 9999;
}
.gt-container .gt-avatar-github {
  background: #fff;
  border-radius: 50%;
}
.gt-container .gt-comment-admin .gt-comment-content {
  border-radius: 6px;
}
.dark .gt-container .gt-header-textarea {
  background: #f6f6f6;
}
.dark textarea::placeholder {
  color: #a8a8a8;
}
</style>
