var path = require("path");
var Html = require('html-webpack-plugin');
var MiniCSS = require("mini-css-extract-plugin");
var Compression = require("compression-webpack-plugin");

module.exports = (env) => {
    const isDev = env.dev ? true : false;
    const isProd = env.prod ? true : false;
    const config = {};
    const Clean = require('clean-webpack-plugin');
    const browsers = {
        dev: ['Chrome > 60'],
        prod: ['> 3%']
    }

    config.entry = "./src/app.js",
    config.output = {
            filename: isDev ?
                "[name].js" : "[name].[chunkhash].js",
            path: path.resolve(__dirname, "build")
    },
    watch =  true,
    config.mode = isProd ?
        "production" :
        "development";
    config.devtool = isProd ?
        false :
        "source-map";

    config.module = {};
    config.module.rules = [];

    const js = {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            // options: {
            //     presets: [
            //         ['env', {
            //             targets: {
            //                 browsers: [
            //                     '> 1%',
            //                     'last 2 versions',
            //                     'ie 10'
            //                 ]
            //             }
            //         }]
            //     ]
            // }
        }
    }
    config.module.rules.push(js);

    const scss = {
        test: /\.scss$/,
        use: [
            isProd ?
            MiniCSS.loader :
            'style-loader',
            {loader: 'css-loader',
                options: {
                    sourceMap: isProd ? false : true,
                    minimize: isProd ? true : false,
                    plugins: () => [
                        new require('autoprefixer')({
                            browsers: [
                                'ie 11'
                            ]
                        })
                    ]
                }
            },
            'sass-loader'
        ]
    }
    config.module.rules.push(scss);

    config.plugins = [];
    if (isProd) {
        config.plugins.push(new MiniCSS({
            filename: 'app.[chunkhash].css'
        }))
    }

    const images = {
        test: /\.(jpg|jpeg|gif|png|csv)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: isProd ?
                    '[name].[hash].[ext]' : '[name].[ext]',
                publicPath: 'images',
                outputPath: 'images'
            }
        }
    }
    config.module.rules.push(images);

    const fonts = {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: isProd ?
                    '[name].[hash].[ext]' : '[name].[ext]',
                publicPath: 'fonts',
                outputPath: 'fonts'
            }
        }
    }
    config.module.rules.push(fonts);

    config.plugins.push(new Html({
        filename: 'index.html',
        template: './app.html',
        minify: isProd ? {
            collapseWhitespace: true
        } : false
    }));

    if (isProd) {
        config.plugins.push(new Compression({
            threshold: 0,
            minRatio: 0.8
        }));
    }
    if (isProd) {
        config.plugins.push(
            new Clean(['build'])
        );
    }
    if (isDev) {
        config.devServer = {
            clientLogLevel: "none",
            compress: true,
            port: 8080,
            progress: true,
            overlay: true
        }
    }

    return config;
}
