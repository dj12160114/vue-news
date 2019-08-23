# vue项目

### 制作首页App组件
1. 完成 header 区域，使用的是 Mint-UI 的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
  + 制作 购物车小图标时操作相对多一些：
  + 拷贝 扩展图标的 css 和 fonts 文件到项目中去
  + 修改 购物车 小图标的类
3. 中间区域放一个 router-view 来展示 路由匹配到的组件

### 改造 tabbar 为 router-link，点击则展示对应组件
1. 更改 a 标签为 router-link
2. href 属性改为 to 属性
3. 修改 to 属性的内容，改为应当展示的组件名字
4. 修改默认的 路由高亮类（linkActiveClass设置）为 mui-active

### 制作首页轮播图
1. Mint-UI 引入对应 轮播图swipe 组件
2. 使用 vue-resource 的 this.$http.get 获取远端数据并保存到data上
3. v-for 渲染 item 项

## 改造 首页 六宫格的样式

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
+ **顶部滑动条**
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

+ **图片列表**
  - 使用懒加载技术，利用Mint-UI提供的现成 组件

+ **图片详情页面**
  - 改造li标签为 router-link， tag属性指定它渲染为什么元素
  - 缩略图实现   
    - 安装图片预览插件 vue-preview
    - 获取图片数据

+ **安卓手机中预览调试项目**
  - 保证 手机和电脑 处于同一个 WIFI 环境中，即手机可以访问到电脑的 IP地址
  - 在 package.json文件的 dev 脚本中，添加一个 --host 指令，把当前电脑的 WIFI IP 地址设置为 --host的指令值
  - cmd 终端中 运行 ```ipconfig```查看 WIFI IP 地址

+ **商品购买和商品详情页面**
  - 点击 加入购物车 的小球动画
    - 注意：小球最终位移的位置不能写死，否则就局限在了某一分辨率下的 滚动条未滚动的情况
    - 应当根据不同情况 动态计算 位移坐标值
    - 解决方案：
     
     1. 先得到 最终位置的 横纵坐标，再得到 小球的 横纵坐标，然后 取 前者与后者之差，就是位移距离
     2. 获取 小球和最终点的位置 可以使用 ```domObject.getBoundingClientRect()```
  
  - 实现点击 加入购物车按钮 拿到选择的数量
    - 按钮属于 GoodsInfo 组件，数字属于 InfoNum 组件，前者为父组件，后者为子组件
    - 父子组件嵌套，无法直接在 父组件 页面拿到 子组件的数量值，涉及 子组件向父组件传值（事件调用机制）
     ```
     事件调用机制的本质：
     父组件向子组件传递方法，子组件调用这个方法，同时把 数据 当作 参数 传递给这个方法
     ```
  - 实现 根据库存数 设置最大的可选数量
    - 库存数为 父组件上的 goodsinfo.stock_quantity, 最大可选数量在子组件的 data-numbox-max上
    - 所以涉及 父组件向 子组件传值，但 goodsinfo.stock_quantity 是 ajax异步获取到的数据，在父组件上渲染 max属性时 可能还没有拿到数据，因此会造成max = undefined 的情况
    - 采用 watch 监听 max属性的变化，当它发生变化时再设置 最大值

    
  

 

