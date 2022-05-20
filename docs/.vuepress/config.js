const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  base: '/blog',
  lang: 'zh-CN',
  title: '你好， VuePress !',
  description: '这是我的第一个 VuePress 站点',
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
    navbar: [
      // 嵌套 Group - 最大深度为 2
      {
        text: 'Group',
        children: [
          {
            text: 'SubGroup',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
        ],
      },
      // 控制元素何时被激活
      {
        text: 'Group 2',
        children: [
          {
            text: 'Always active',
            link: '/',
            // 该元素将一直处于激活状态
            activeMatch: '/',
          },
          {
            text: 'Active on /foo/',
            link: '/not-foo/',
            // 该元素在当前路由路径是 /foo/ 开头时激活
            // 支持正则表达式
            activeMatch: '^/foo/',
          },
        ],
      },
    ],
  }),
}
