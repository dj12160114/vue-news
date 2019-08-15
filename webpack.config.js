const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    mode: 'development',
  
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        open: true, 
        port: 3000, 
        contentBase: 'src', 
        hot: true 
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'

        }),
        new VueLoaderPlugin()
    ],

    module: { // 配置 所有的 第三方模块 加载器
        rules: [// 所有第三方模块的匹配规则
            // 匹配所有以 .css 结尾的文件
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|bmp|jpeg)$/, use: 'url-loader?limit=5177140&name=[hash:8]-[name].[ext]' },
            // limit给定的值是图片的大小，单位是byte，引用的图片大于或等于给定的limit值，则
            // 不会被转为base64的字符串，如果小于给定的值，就会被转为base64值(但是我使用的时候只有大于有用，等于
            // 依然是base64值)
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },

    resolve: {// 设置 vue 导入的包的路径
        alias: {
            // "vue$": 'vue/dist/vue.js'
        }
    }
}