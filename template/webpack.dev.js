const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    { 
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [autoprefixer()],
                                hideNothingWarning: true
                            }
                        }
                    },
                    { 
                        loader: 'sass-loader',
                        options: {
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ['node_modules']
                            }
                        }
                    }
                ]
            }
      ]
    },
    devServer: {
        historyApiFallback: true,
        port: 80
    },
    resolve: {
        fallback: {
            fs: false,
            net: false,
            tls: false
        }
    }
}
