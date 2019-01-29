const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;
    // reduce it to a nice object, the same as before
    if (env)
        const envKeys = Object.keys(env).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(env[next]);
            return prev;
        }, {});

    return {
        entry: __dirname + "/src/index.jsx",
        output: {
            path: __dirname + '/dist',
            filename: 'hify-min.js'
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                modules: __dirname + '/node_modules'
            }
        },
        module: {
            rules: [
                {
                    test: /.js[x]?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: { minimize: true }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new HtmlWebPackPlugin({
                template: "./public/index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ]
    }
};

