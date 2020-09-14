module.exports = {
  title: "Jing の Blog",
  description: "锦衣夜行 の 夜无知者",
  head: [//下面设置浏览器header栏的图片
    ['link', { rel: 'icon', href: '/img/favicon.png' }]],
  base: '/blog/',
  markdown: { lineNumbers: true },// 代码块显示行号
  themeConfig: {
    sidebarDepth: 4,//markdown中h2 和 h3标题，显示在侧边栏上的最大数量。
    lastUpdated: 'Last Updated',// 文档更新时间：每个文件git最后提交的时间
    nav: [//代表导航栏，还可以设置为下拉列表的方式;也可以外部链接
      { text: '只争朝夕', link: '/dreaming/' },
      { text: '蜉蝣天地', link: '/living/' },
      { text: '摸鱼', link: '/work/' },
    ],
    sidebar: {//侧边栏
      "/work/": [
        {
          title: "1. 事件热点",//分组1
          collapsable: true,
          children: [
            'case/agora'//务必使用相对路径写法，默认查找work/case/agora.md文件
          ]
        },
        {
          title: "2. 职场感冒",
          collapsable: true,
          children: [
		  
          ],
        },
      ],
      "/living/": [//点击后会默认主页面显示该目录下的README.md内容
       'day20200914'
      ],
      "/dreaming/": [
        'vuepress'//''默认代表README.md
      ],
    }
  }
}