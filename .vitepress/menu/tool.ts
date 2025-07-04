import type { DefaultTheme } from 'vitepress'

export const toolSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Docker',
    collapsed: true,
    items: [
      { text: '安装', link: 'Docker/安装' },
      { text: '命令实战', link: 'Docker/命令实战' },
      { text: '基本概念', link: 'Docker/基本概念' },
      { text: '常用命令', link: 'Docker/常用命令' },
    ],
  },
  {
    text: 'Git',
    collapsed: true,
    items: [
      { text: 'git flow', link: 'Git/git flow' },
      { text: 'git 分支管理策略', link: 'Git/git 分支管理策略' },
      { text: 'pull、fetch', link: 'Git/pull、fetch' },
      { text: 'reset、revert', link: 'Git/reset、revert' },
      { text: 'stash', link: 'Git/stash' },
      { text: 'tag', link: 'Git/tag' },
      { text: '创建空白分支', link: 'Git/创建空白分支' },
      { text: '回到冲突前状态', link: 'Git/回到冲突前状态' },
      { text: '常用命令', link: 'Git/常用命令' },
      { text: '忽略已被 Git 管理的文件', link: 'Git/忽略已被 Git 管理的文件' },
      { text: '忽略文件', link: 'Git/忽略文件' },
      { text: '追加新的改动到之前的 commmit', link: 'Git/追加新的改动到之前的 commmit' },
      { text: '常见问题', link: 'Git/常见问题' },
    ],
  },
  {
    text: 'GitHub',
    collapsed: true,
    items: [
      { text: 'GitHub Actions', link: 'GitHub/GitHub Actions' },
      { text: 'GitHub Pages', link: 'GitHub/GitHub Pages' },
      { text: 'GitHub Secrets', link: 'GitHub/GitHub Secrets' },
      { text: 'github.dev', link: 'GitHub/github.dev' },
      { text: 'github1s', link: 'GitHub/github1s' },
      { text: '上传项目到云服务器', link: 'GitHub/上传项目到云服务器' },
      { text: '两地之间代码同步', link: 'GitHub/两地之间代码同步' },
      { text: '如何添加公钥到 GitHub', link: 'GitHub/如何添加公钥到 GitHub' },
      { text: '将 GitHub 代码同步到 Gitee', link: 'GitHub/将 GitHub 代码同步到 Gitee' },
      { text: '部署静态文件', link: 'GitHub/部署静态文件' },
      { text: '默认分支 main', link: 'GitHub/默认分支 main' },
    ],
  },
  {
    text: 'Linux',
    collapsed: true,
    items: [
      { text: '概述', link: 'Linux/概述' },
      { text: 'find、whereis、where', link: 'Linux/find、whereis、where' },
      { text: 'vim', link: 'Linux/vim' },
      { text: '定时任务', link: 'Linux/定时任务' },
      { text: '打包（归档）和压缩', link: 'Linux/打包（归档）和压缩' },
      { text: '文件及目录管理', link: 'Linux/文件及目录管理' },
      { text: '文件基本属性', link: 'Linux/文件基本属性' },
      { text: '查看开机启动', link: 'Linux/查看开机启动' },
      { text: '查看系统信息 CPU、内存信息', link: 'Linux/查看系统信息 CPU、内存信息' },
      {
        text: '环境变量',
        collapsed: true,
        items: [
          { text: 'source、export', link: 'Linux/环境变量/source、export' },
          { text: '环境变量', link: 'Linux/环境变量/环境变量' },
          { text: '环境变量分类', link: 'Linux/环境变量/环境变量分类' },
        ],
      },
      { text: '用户', link: 'Linux/用户' },
      {
        text: '脚本',
        collapsed: true,
        items: [
          { text: 'deploy', link: 'Linux/脚本/deploy' },
        ],
      },
      { text: '进程、端口', link: 'Linux/进程、端口' },
      { text: '防火墙', link: 'Linux/防火墙' },
    ],
  },
  {
    text: 'MAC',
    collapsed: true,
    items: [
      { text: '查看所有文件', link: 'MAC/查看所有文件' },
    ],
  },
  {
    text: 'Nginx',
    collapsed: true,
    items: [
      { text: '变量', link: 'Nginx/变量' },
      { text: '基础使用', link: 'Nginx/基础使用' },
      { text: '安装', link: 'Nginx/安装' },
      { text: '指令', link: 'Nginx/指令' },
      { text: '部署多个应用', link: 'Nginx/部署多个应用' },
      { text: '重定向到 HTTTPS', link: 'Nginx/重定向到 HTTTPS' },
    ],
  },
  {
    text: 'VSCode',
    collapsed: true,
    items: [
      { text: 'ctrl + shift + f 快捷键冲突', link: 'VSCode/ctrl + shift + f 快捷键冲突' },
      { text: '将 VSCode 添加至右键菜单', link: 'VSCode/将 VSCode 添加至右键菜单' },
      { text: '常用快捷键', link: 'VSCode/常用快捷键' },
      { text: '常用插件', link: 'VSCode/常用插件' },
      { text: '常用配置', link: 'VSCode/常用配置' },
      { text: '自定义折叠代码区别', link: 'VSCode/自定义折叠代码区别' },
    ],
  },
  {
    text: 'Windows',
    collapsed: true,
    items: [
      { text: 'C 盘清理', link: 'Windows/C 盘清理' },
      { text: 'where', link: 'Windows/where' },
      { text: '关闭自动更新', link: 'Windows/关闭自动更新' },
      { text: '双屏切换单屏，之前在另外一显示器显示的软件窗口现无法显示', link: 'Windows/双屏切换单屏，之前在另外一显示器显示的软件窗口现无法显示' },
      { text: '清理右键菜单', link: 'Windows/清理右键菜单' },
      { text: '常用插件', link: 'Windows/常用插件' },
      { text: '处理器架构', link: 'Windows/处理器架构' },
      { text: 'ExecutionPolicy', link: 'ExecutionPolicy' },
    ],
  },
  {
    text: '云服务',
    collapsed: true,
    items: [
      { text: 'CDN', link: '云服务/CDN' },
      { text: 'DNS', link: '云服务/DNS' },
      { text: 'SSL', link: '云服务/SSL' },
      { text: '域名', link: '云服务/域名' },
      { text: '备案', link: '云服务/备案' },
      { text: '对象存储 COS', link: '云服务/对象存储 COS' },
      { text: '按量付费服务器', link: '云服务/按量付费服务器' },
    ],
  },
  {
    text: '宝塔面板',
    collapsed: true,
    items: [
      { text: '新建站点', link: '宝塔面板/新建站点' },
    ],
  },
  {
    text: '谷歌浏览器',
    collapsed: true,
    items: [
      { text: '使用技巧', link: '谷歌浏览器/使用技巧' },
      { text: '常用快捷键', link: '谷歌浏览器/常用快捷键' },
      { text: '常用插件', link: '谷歌浏览器/常用插件' },
    ],
  },
  {
    text: '静态站点',
    collapsed: true,
    items: [
      { text: 'srcDir 的作用', link: '静态站点/srcDir 的作用' },
      { text: 'Vitepress', link: '静态站点/Vitepress' },
      { text: '自动生成侧边栏', link: '静态站点/自动生成侧边栏' },
      { text: '集成 Algolia', link: '静态站点/集成 Algolia' },
    ],
  },

  { text: 'Cursor', link: 'Cursor' },
  { text: 'xftp', link: 'xftp' },
  { text: 'xshell', link: 'xshell' },
  { text: 'vanblog', link: 'vanblog' },
  { text: 'Charles', link: 'Charles' },
  { text: 'Cloudflare', link: 'Cloudflare' },
  { text: 'Vercel', link: 'Vercel' },
  { text: '制作 logo、favicon', link: '制作 logo、favicon' },
  { text: '数字签名与数字证书', link: '数字签名与数字证书' },
  { text: '语雀', link: '语雀' },
  { text: 'Chocolatey', link: 'Chocolatey' },
  { text: 'mkcert', link: 'mkcert' },
  { text: '常用应用', link: '常用应用' },
]
