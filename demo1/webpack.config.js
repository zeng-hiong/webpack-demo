const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const extractTextPlugin=require('extract-text-webpack-plugin');
const glob=require('glob');

let entriesObj=getView('./src/*.js')

const config={
  entry:entriesObj,
  output:{
     publicPath:path.resolve(__dirname,'dist'),
     path:path.resolve(__dirname,'dist'),
     filename:'js/[name].js'
  },
  mode:'production',
  //将依赖的库指向全局变量，从而不再打包这个库
  externals:{jquery:'window.$'},//或者使用new webpack.ProvidePlugin({$:'jquery',jQuery:'jquery','window.jQuery':'jquery'})定义全局jQuery
  resolve:{
      extensions:['*','.js','.html','.css'],
      alias:{jquery:'src/jquery.js'},
      modules:[__dirname,'node_modules']
  },
  module:{
     rules:[
        { test:/\.css$/,use:extractTextPlugin.extract('css-loader','style-loader')},
        { test:/\.js$/,use:['babel-loader'],exclude:/node_modules/},
        {
          test:/\.(jpg|png)$/,use:{
            loader:'url-loader',
            options:{
               limit:4096,
               name:'img/[name].[hash].[ext]',
               publicPath:'../'//打包后css里面的图片路径
            }
          }//超过大小的在images文件夹下生成原图片名加上8位hash值
        },{test:/\.html$/,use:{loader:'html-loader'}}//打包后html里面的图片路径
      ]
  },
   devServer:{
    contentBase:'./dist',//本地服务器所加载的页面所在的目录
    historyApiFallback:true,//不跳转
    inline:true,//实时刷新
   },
   optimization:{
        /*runtimeChunk:{
            name:'common'
        },*/
        splitChunks:{
          chunks:'initial',//必须三选一，initial|all|async
          minSize:0,
          minChunks:2,//最少出現次數
          cacheGroups:{//缓存的chunks
             commons:{
                name:'common',
                chunks:'all'
             }
          }
        }/*,
        splitChunks:{
          cacheGroups:{
            commons:{
              test:/[\\/]node_modules[\\/]/,
              name:'vendor',
              chunks:'all'
            }
          }
        }*/
     },
  plugins:[
     new HtmlWebpackPlugin({
      filename:'html/card-build.html',
      template:__dirname+'/card.html',
      inject:'body',
      hash:true,
      title:'card',
      chunks:['card']
    }),
     new HtmlWebpackPlugin({
      filename:'html/account-build.html',
      template:__dirname+'/account.html',
      inject:'body',
      hash:true,
      title:'account',
      chunks:['account'],
      minify:{
        removeComments:true,//移除注释
        collapseWhitespace:false//删除空白符与换行符
      }
    }),
     new HtmlWebpackPlugin({
      filename:'html/index-build.html',
      template:__dirname+'/index.html',
      inject:'body',
      hash:true,
      title:'index',
      chunks:['']
    }),
     new extractTextPlugin('css/[name].css')
   ]
}


function getView(globPath,flag){
    let files = glob.sync(globPath);

    let entries = {},
    entry, dirname, basename, pathname, extname;

    files.forEach(item => {
        entry = item;
        dirname = path.dirname(entry);//当前目录
        extname = path.extname(entry);//后缀
        basename = path.basename(entry, extname);//文件名
        pathname = path.join(dirname, basename);//文件路径
        if (extname === '.html') {
            entries[pathname] = './' + entry;
        } else if (extname === '.js') {
            entries[basename] = entry;
        }
    });

    return entries;
}



module.exports=config;

