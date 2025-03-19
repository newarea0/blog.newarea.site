// 配置完成后，该网站将能够:
// 1. 被安装到用户设备上，显示配置的图标和名称
// 2. 在离线状态下继续工作(访问已缓存的页面和资源)
// 3. 智能缓存第三方资源(Google字体、CDN资源等)
// 4. 自动更新PWA应用内容
// https://vite-pwa-org.netlify.app/
import { resolve } from 'node:path'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import { description, title } from './meta'

const pwa: Partial<VitePWAOptions> = {
  // 指定PWA文件输出目录
  outDir: resolve(__dirname, '../../../dist'),
  // 自动更新，PWA会自动检查并应用更新
  registerType: 'autoUpdate',
  // 表示不在HTML中自动包含manifest中定义的图标
  includeManifestIcons: false,
  // 应用清单
  manifest: {
    // 应用ID
    id: '/',
    // 应用名称
    name: title,
    // 应用短名称
    short_name: title,
    // 应用描述
    description,
    // 主题颜色
    theme_color: '#ffffff',
    // 应用图标
    icons: [
      {
        src: '/favicon/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  },
  // 缓存策略
  workbox: {
    // 定义哪些类型的静态资源应该被缓存
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    // 缓存策略
    runtimeCaching: [
      {
        // 匹配的URL模式
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        // 缓存策略
        handler: 'CacheFirst',
        // 缓存选项
        // CacheFirst: 优先使用缓存，如果缓存中没有才请求网络(适用于字体等很少变化的资源)
        // NetworkFirst: 优先从网络获取，如果网络请求失败才使用缓存(适用于经常更新的CDN资源)
        options: {
          // 缓存名称
          cacheName: 'google-fonts-cache',
          // 缓存过期时间
          expiration: {
            // 缓存最大条目数
            maxEntries: 10,
            // 缓存有效期一年
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          // 缓存可响应状态
          cacheableResponse: {
            // 缓存成功响应
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'jsdelivr-images-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}
export default pwa
