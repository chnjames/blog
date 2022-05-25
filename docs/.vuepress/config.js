// 配置文件
const { defaultTheme } = require('@vuepress/theme-default')
const { nprogressPlugin } = require('@vuepress/plugin-nprogress')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
// const { docsearchPlugin } = require('@vuepress/plugin-docsearch')
const { path } = require('@vuepress/utils')

const sidebar = require('./sidebar')
const navbar = require('./navbar')

module.exports = {
  base: '/blog',
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
    },
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    // '@vuepress/register-components', {
    //    componentsDir: path.resolve(__dirname, './components')
    //  },
    '@vuepress/plugin-docsearch', {
      appId: '6LGAI4WJ6B',
      apiKey: 'e1920962bdda4ae8c65f2a2cc9eee8af',
      indexName: 'vuepress',
      searchParameters: {
        facetFilters: ['tags:v2']
      },
      placeholder: '搜索文档',
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档'
        },
        modal: {
          searchBox: {
            resetButtonTitle: '清除查询条件',
            resetButtonAriaLabel: '清除查询条件',
            cancelButtonText: '取消',
            cancelButtonAriaLabel: '取消'
          },
          startScreen: {
            recentSearchesTitle: '搜索历史',
            noRecentSearchesText: '没有搜索历史',
            saveRecentSearchButtonTitle: '保存至搜索历史',
            removeRecentSearchButtonTitle: '从搜索历史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '从收藏中移除'
          },
          errorScreen: {
            titleText: '无法获取结果',
            helpText: '你可能需要检查你的网络连接'
          },
          footer: {
            selectText: '选择',
            navigateText: '切换',
            closeText: '关闭',
            searchByText: '搜索提供者'
          },
          noResultsScreen: {
            noResultsText: '无法找到相关结果',
            suggestedQueryText: '你可以尝试查询',
            reportMissingResultsText: '你认为该查询应该有结果？',
            reportMissingResultsLinkText: '点击反馈'
          }
        }
      }
    }
  ],
  theme: defaultTheme({
    // page meta
    editLinkText: '在 GitHub 上编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '上次更新',
    // custom containers
    tip: '提示',
    warning: '注意',
    danger: '警告',
    // custom containers
    backToHome: '返回首页',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接'
    ],
    // a11y
    openInNewWindow: '在新窗口打开',
    toggleDarkMode: '切换夜间模式',
    toggleSidebar: '切换侧边栏',
    // 导航栏配置
    navbar,
    // 侧边栏对象
    sidebar
  })
}
