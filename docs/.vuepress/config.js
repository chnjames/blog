const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  base: '/blog',
  lang: 'zh-CN',
  title: '一点一木前端进阶',
  description: '高级前端进阶之路',
  logo: '/images/hero.png',
  plugins: [
    ['@vssue/vuepress-plugin-vssue', {
      platform: 'github',
      owner: 'chnjames',
      repo: 'blog',
      clientId: 'fc6109bbcae36ff80c0c',
      clientSecret: 'd06512d022ff2dea3f700b6002fd1273c56983d0',
      autoCreateIssue: true //自动创建评论
    }],
  ],
  theme: defaultTheme({
    // 导航栏配置
    navbar: [
      {
        text: 'Home',
        link: '/guide/',
      }, {
        text: '进阶·博文',
        children: ['/reference/cli.md', '/reference/config.md'],
      }, {
        text: '每日·壹题',
        children: ['/group/foo.md', '/group/bar.md'],
      }
    ],
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: ['/guide/README.md', '/guide/getting-started.md']
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          children: ['/reference/cli.md', '/reference/config.md']
        }
      ]
    }
  })
}
