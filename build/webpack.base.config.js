/*
 * @Date: 2020-05-29 14:30:28
 * @LastEditTime: 2020-07-24 10:18:08
 */

const utils = require("./utils");
const path = require("path");

module.exports = {
  // 入口
  entry: {
    app: "./src/index",
  },
  // 出口
  output: {
    path: utils.resolve("../dist"),
    filename: "js/[name].[hash].js",
    publicPath: "/", // 打包后的资源的访问路径前缀
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
    alias: {
      "@": path.join(__dirname, "..", "src"), // 在项目中使用@符号代替src路径，导入文件路径更方便
    },
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/, // 屏蔽不需要处理的文件（文件夹）（可选）
        loader: "babel-loader", // loader的名称（必须）
        query: {
          // presets: ["env", "react"],
          plugins: [
            ["import", { libraryName: "antd", style: true }], // antd按需加载
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // 创建 <style></style>
          "css-loader", // 转换css
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 创建 <style></style>
          "css-loader", // 转换css
          "resolve-url-loader", // 处理scss中url()文件
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          }, // 编译 Less -> CSS
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  "primary-color": "#1A61DC",
                  "border-radius-base": "2px",
                  "layout-header-height": "60px",
                  "layout-header-background": "#1A61DC",
                  "menu-dark-item-active-bg": "#1859CB",
                  "menu-dark-color": "#FFFFFF",
                  "menu-highlight-color": "#39A1FD",
                  "menu-item-active-border-width": "2px",
                  "layout-sider-background": "#ffffff",
                  "input-height-lg": "34px",
                  "btn-height-lg": "34px",
                  "btn-font-size-lg": "12px",
                  "select-single-item-height-lg": "34px",
                  "table-border-radius-base": "0",
                  "table-font-size": "12px",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: "static/img/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: "static/fonts/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [path.resolve(__dirname, "src")], // 指定检查的目录
        options: {
          // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require("eslint-friendly-formatter"), // 指定错误报告的格式规范
        },
      },
    ],
  },
};
