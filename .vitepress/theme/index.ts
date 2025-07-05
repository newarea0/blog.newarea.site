// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
// 阅读增强
import { InjectionKey, LayoutMode, NolebaseEnhancedReadabilitiesMenu, NolebaseEnhancedReadabilitiesScreenMenu } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import type { Options } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

// 闪烁高亮当前的目标标题
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

import NavLinks from '../components/vue/NavLinks.vue'
import MusicPlayer from '../components/vue/MusicPlayer.vue'
import Giscus from '../components/vue/Giscus.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      // 添加音乐播放器到导航栏
      'nav-bar-content-before': () => h(MusicPlayer),

      'layout-top': () => [
        h(NolebaseHighlightTargetedHeading),
      ],
      'doc-footer-before': () => h(Giscus),
    })
  },
  enhanceApp({ app }) {
    app.component('NavLinks', NavLinks)
    app.component('MusicPlayer', MusicPlayer)

    app.provide(InjectionKey, {
      layoutSwitch: {
        // 默认全屏宽度
        defaultMode: LayoutMode.FullWidth,
      },
    } as Options)
  },
} satisfies Theme
