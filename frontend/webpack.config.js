const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    App: "./src/App.js"
  },

  output: {
    path: path.resolve(__dirname, "./static/build/"),
    filename: "[name].js",
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|gif|webp)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },

  optimization: {
    minimize: true
  },

  performance: {
    maxEntrypointSize: 1012000,
    maxAssetSize: 1012000
  },

  plugins: [

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),  // development production
      },
    }),

    new webpack.ProvidePlugin({
      "React": "react",
   }),
   
  ],

};