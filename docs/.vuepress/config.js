const { defaultTheme } = require('@vuepress/theme-default')
const { nprogressPlugin } = require('@vuepress/plugin-nprogress')

const sidebar = require('./sidebar')
const navbar = require('./navbar')

module.exports = {
  base: '/blog',
  lang: 'zh-CN',
  title: '一点一木前端进阶',
  description: '高级前端进阶之路',
  logo: '/images/hero.png',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }]
  ],
  plugins: [
    nprogressPlugin(),
    '@vssue/vuepress-plugin-vssue', {
      platform: 'github-v4',
      owner: 'chnjames',
      repo: 'blog',
      clientId: 'fc6109bbcae36ff80c0c',
      clientSecret: 'd06512d022ff2dea3f700b6002fd1273c56983d0'
    }
  ],
  theme: defaultTheme({
    contributorsText: '贡献者',
    lastUpdatedText: '上次更新',
    backToHome: '返回首页',
    notFound: ['抱歉，找不到该页面！', '老子今天不上班，没时间写这些文章！', '换个地方看看吧！'],
    // 导航栏配置
    navbar,
    // 侧边栏对象
    sidebar
  })
}
