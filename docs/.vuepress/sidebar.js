module.exports = {
    // 前端进阶
    '/reference/': [
        {
            text: '经典图谱',
            collapsible: true,
            children: ['/reference/base.md']
        }, {
            text: '项目经验',
            collapsible: true,
            children: ['/reference/experience.md']
        },
        '/reference/vue3.md',
        '/reference/vite_vue3_ts.md',
        '/reference/promise.md',
        '/reference/class.md'
    ],
    // 面试宝典
    '/topic/': [
        {
            text: '原型Prototype',
            collapsible: true,
            children: ['/topic/prototype.md']
        }
    ],
    // 前方的路
    '/future/': [
        {
            text: '个人荣誉',
            collapsible: true,
            children: ['/summary/honor.md']
        }, {
            text: '个人荣誉',
            collapsible: true,
            children: ['/summary/honor.md']
        }
    ],
    // 个人简介
    '/summary/': [
        {
            text: '前路漫漫',
            collapsible: true,
            children: ['/summary/honor.md']
        }
    ],
    // 软件推荐
    '/software/': [
        {
            text: '软件推荐',
            collapsible: true,
            children: ['/software/recommend.md']
        }, {
            text: '使用教程',
            collapsible: true,
            children: [
                '/software/tutorial.md',
                '/software/platform.md'
            ]
        },
        '/software/GithubCopilot.md'
    ]
}