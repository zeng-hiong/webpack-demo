var webpack=require('webpack');
var path=require('path');
var HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports = {
  /*target:'async-node',*/
  devtool:'eval-source-map',//显示出错代码位置
  entry: path.join(__dirname + '/app/main.js'),
    //另外两种写法形式1.entry: path.resolve(__dirname, 'app');2.entry: path.join(__dirname, 'app');先path=require('path')
  //已多次提及的唯一入口文件entry:path.resolve(_dirname,'app')，context 配置entry的根目录
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方 [name].bundle.js
    //publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
    filename: "bundle.js"//打包后输出文件的文件名,chunkFilename:"[id].bundle.js",'[name].js'
  },
  devServer: {
  	port:8080,
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转，用于开发单页面应用，依赖于HTML5 history API 设置为true点击链接还是指向index.html
    inline: true,//实时刷新在iframe模式下：页面是嵌套在一个iframe下的，在代码发生改动的时候，这个iframe会重新加载
    //在inline模式下：一个小型的webpack-dev-server客户端会作为入口文件打包，这个客户端会在后端代码改变的时候刷新页面
    // prot设置默认监听端口，如果省略，默认为"8080"
  //  process: true,显示合并代码进度,colors:true终端中输出结果为彩色.
  },
  plugins:[
  new webpack.HotModuleReplacementPlugin(),
  /*new webpack.optimize.CommonsChunkPlugin({
  	name:'inline',filename:"inline.js",minChunks:Infinity
  })*/
  /*new webpack.optimize.UglifyJsPlugin()
  new HtmlWebpackPlugin({
  	title:'searchBar',template:'./src/index.html'
  }),
  new webpack.ProvidePlugin({
	$:"jquery",
	jQuery:'jquery',
	"window.jQuery":"jquery"
  })*/
  ],
  module:{
  	rules:[{
  		test:/(\.jsx|.js)$/,
  		use:{
  			loader:'babel-loader',
  			options:{
  				presets:[
  				"es2015","react"]
  			}
  		},
  		exclude:/node_modules/
  	},{
  		test:/\.css$/,
  		use:[{
  			loader:"style-loader"//链式调用时从右到左执行且loader之间用“!”来分割。
  		},{
  			loader:'css-loader',
  			options:{
  				modules:true
  			}
  		},{
  			loader:'postcss-loader'
  		}]
  	},{
  		test:/.(png|jpg|jepg)$/,
  		loader:'url?limit=40000'
  	}]
  },
  resolve:{
  	extensions:['.js','.jsx']
  } 
}
