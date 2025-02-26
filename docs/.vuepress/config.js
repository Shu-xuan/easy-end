import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  // 部署站点的基础路径
  base: "/easy-end/",
  // 站点的语言
  lang: 'zh-CN',
  // 站点的标题
  title: 'Easy-End',
  // 站点的描述
  description: '后端笔记',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    nav: [
      // 格式一: 直接跳转，'/'为不添加路由，跳转至首页
      {text: '首页', link: '/'},
      // 格式二: 添加下拉菜单， link指向的文件路径
      {
        text: '工具',
        ariaLabel: '工具',
        items: [
          {text: 'Git', link: '/pages/tool/Git.md'}
        ]
      },
    ],

    


  }),

  bundler: viteBundler(),
})
