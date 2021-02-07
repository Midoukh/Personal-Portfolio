// Webpack uses this to work with directories
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ASSET_PATH = process.env.ASSET_PATH || '/';



// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  context: __dirname,
  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/js/index.js',


  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'

  },
  devServer: {
    contentBase: 'public'
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      util: require.resolve("util/")
    },
    fallback: {
      "stream": false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "crypto-browserify": false,
      "os": require.resolve("os-browserify/browser"),
      "vm": false,
      "constants": require.resolve("constants-browserify")
    }

    // alias: {
    //   path: require.resolve("path-browserify")
    // },
    // add your other extensions here
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    }),
    new HtmlWebpackPlugin({
      filename: './pages/bio.html',
      template: './src/html/bio.html',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: './pages/contact.html',
      template: './src/html/contact.html'
    }),
    new HtmlWebpackPlugin({
      filename: './pages/skills.html',
      template: './src/html/skills.html'
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"

    }),
    new CopyPlugin({
      patterns: [
        // { from: path.resolve(__dirname, 'imgs') }
        { from: './src/assets/img', to: 'imgs' }

      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/
        /* ... */
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            }

          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader",
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader"
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader",

            // In options we can set different things like format
            // and directory to save
            options: {
              outputPath: './images'
            }
          }
        ]
      }
    ]
  }
};
