# vue项目
***

## 制作首页App组件
1. 完成 header 区域，使用的是 Mint-UI 的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
  + 制作 购物车小图标时操作相对多一些：
  + 拷贝 扩展图标的 css 和 fonts 文件到项目中去
  + 修改 购物车 小图标的类
3. 中间区域放一个 router-view 来展示 路由匹配到的组件
***

### 改造 tabbar 为 router-link，点击则展示对应组件
1. 更改 a 标签为 router-link
2. href 属性改为 to 属性
3. 修改 to 属性的内容，改为应当展示的组件名字
4. 修改默认的 路由高亮类（linkActiveClass设置）为 mui-active
***

### 制作首页轮播图
1. Mint-UI 引入对应 轮播图swipe 组件
2. 使用 vue-resource 的 this.$http.get 获取远端数据并保存到data上
3. v-for 渲染 item 项

## 改造 首页 六宫格的样式
***

## 改造六宫格列表 为链接

### 一、 新闻资讯列表
+ 绘制组件界面，使用 MUI 中的 media-list.html
+ 使用vue-resource 获取数据
  - 利用```Vue.http.options.root```定义全局根路径
+ 渲染数据
+ 格式化 时间显示
  - 定义全局过滤器
  - 引入时间格式化插件```moment```

#### 新闻详情页
+ 新闻列表项 改造为 router-link 链接，同时在跳转的时候应该提供唯一的 id 作为标识符
+ 创建 新闻详情组件页面，并将 路由地址和 组件页面 联系起来

#### 评论组件
+ 创建 评论 子组件Comments.vue 并将其引入需要它的页面
  - ```import Comment from './Comment.vue'```
  - 父组件中使用 components 属性，引入 Comment 组件注册为子组件
  - 将注册子组件时候的名称以标签形式，引入页面即可
+ 获取评论数据
+ 为 加载更多 按钮绑定事件 getMore
+ 发表评论 实现
  - 文本框数据 做双向绑定
  - 为发表按钮绑定事件
  - 检验评论内容是否为空，为空则 Toast 提醒用户
  - 通过 vue-resource发送一个请求，以查看最新评论
  - 发表成功之后，重新刷新列表，查看最新评论

### 二、 图片分享
+ 顶部滑动条
  - 借助于 MUI 中的 tab-top-webview-main.html
  - 为了正常触发滑动，需要初始化一下 scoll 组件：
    - 导入 mui.js，调用官方提供的方式 初始化：
    ```js
    mui('.mui-scoll-wrapper').scoll({
      deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小
    }) 
    ```
  - 导入 mui.min.js 后报错： 'TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them'

    - mui.min.js中使用的东西与webpack默认严格模式打包产生冲突
    - 所以需要移除 webpack 的严格模式：

      1. ``` npm i babel-plugin-transform-remove-strict-mode -D ```
      2. ```.baberlc``` 中配置：
        ```
        {
          "plugins": [transform-remove-strict-mode]
        }       
        ```
  - 滑动条初始化函数需要放在 mounted 钩子函数中，以防重新进入图片分享页面，滑动条无法正常工作
  - 渲染顶部图片分类标题列表

+ 图片列表
1. 使用懒加载技术，利用Mint-UI提供的现成 组件
      

 

