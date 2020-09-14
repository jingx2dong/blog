# 使用Vuepress搭建Github博客
## 参考资料
1. [官网](https://www.vuepress.cn/)
2. [Emoji表情](https://www.webfx.com/tools/emoji-cheat-sheet/)
3. [不错资料](http://obkoro1.com/web_accumulate/accumulate/amateur/VuePress%E6%96%87%E6%A1%A3.html#%E5%A6%82%E4%BD%95%E6%90%AD%E5%BB%BA%E6%9C%AC%E6%96%87%E6%A1%A3)、[简书资料](https://www.jianshu.com/p/1f199ee49e4c)
## 步骤
1. 安装VuePress，可以参考博客或者官网。本人是Win环境搭建
   1. 全局安装`npm install -g vuepress` ，前提是先安装`npm`。
   2. 创建文件夹比如study，在此路径按住`Shift`右击空白处，选择此处打开`PowerShell`。
   3. 利用命令`npm init -y`进行快速初始化。
   4. 在Package.json中添加下面的代码
   ```javascript
   {
    "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs" 
    }
    }  
   ```
   5. 进入docs文件创建README.md，然后运行`npm run docs:dev`,打开浏览器即可查看效果 
2. 设置Github
   1. 首先，在 docs/.vuepress/config.js 中配置正确的 base
   ```javascript
     title: "My Blog",//标题
     description: "This is a blog.",//描述
     base: '/blog/' //要设置为和Github子仓库一样的路径
   ```
   2. 在你的Github中创建一个新的仓库，命名为`blog`，再创建一个分支`gh-pages`
   3. 点击你的【Settings】标签，选择你的Souce为【gh-pages】分支即可
3. 创建Github Action
   1. 将你的分支默认设为master，然后新建一个Yaml文件
    ```yaml
    name: Jekyll site CI
    on:
      push:
        branches: [ master ]
    jobs:
      build:
        runs-on: ubuntu-latest

        steps:
        - name: Checkout
          uses: actions/checkout@v2 
          with: 
            persist-credentials: false
        - name: install and build
          run: |      
          npm install
          npm run docs:build
        - name: Deploy
          uses: JamesIves/github-pages-deploy-action@releases/v3
          with:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            BRANCH: gh-pages 
            FOLDER: docs/.vuepress/dist
    ```
   2. 几需要关注的点：
      1. master有提交时触发流程`on push branch: [master]`
      2. 生成静态页面到指定分支`BRANCH: gh-pages`
      3. 静态页面文件目录`docs/.vuepress/dist`
      4. Github Token直接这样写就可以，不需要网上说的设置SSH
   3. 这样clone`master`分支到本地，再修改提交时，就可以自动更新静态资源到`gh-pages`分支，然后打开博客看了
4. 配置默认主题
    1. 先看下全部的Script
    ```javascript
    module.exports = {
    title: "Jing の Blog",
    description: "锦衣夜行 の 夜无知者",
    head:[//下面设置浏览器header栏的图片
    ['link', {rel:'icon', href:'/img/favicon.png'}]],
    base: '/blog/',
    markdown: {lineNumbers: true},// 代码块显示行号
    themeConfig: {
	  sidebarDepth: 2,//markdown中h2 和 h3 标题，显示在侧边栏上的最大数量。
	  lastUpdated: 'Last Updated',// 文档更新时间：每个文件git最后提交的时间
	nav:[//代表导航栏，还可以设置为下拉列表的方式;也可以外部链接
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

      ],
      "/dreaming/": [
        'vuepress'//''默认代表README.md
        ],
      }
     }
    }
    ```
   2. 设置浏览器的header图片要新建`img`的目录,然后下载喜欢的图片即可。我不会告诉你阿里的矢量图库特别好用的~
   3. 默认是使用`md`文件中的`h1`标题作为侧边栏的显示，也可以使用手动指定`['path','title']`
   4. `markdown`对大小写是格式是非常敏感的，文件名不能大写，`[]`这两个符号谨慎使用，曾经由于格式问题无法显示。  
## 总结
1. VuePress本地利用markdown来进行博客撰写
2. 利用Github来进行保存
3. 利用Github Action(或者其他CI工具Travis)来自动在Github来进行景泰文件生成
4. 利用Github Pages进行博客展示
## 感悟
1. 学习的主要材料首先要利用好官网的文档，最新，相对较全！
2. 不要乱看，对于陌生的领域也要抓住主线，尝试把握脉络，尝试理解原理，才能更快更好的学习。
3. 写代码戒急用忍，生气、着急是没有用的，只有冷静
4. 专注是提高效率的最好的方式