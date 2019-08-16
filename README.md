# vue项目
***

##制作首页App组件
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
