const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge')
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = env => {
    let envKeysParsed = {}

    if (!env.production) {
        let envAux = dotenv.config().parsed;
        // reduce it to a nice object, the same as before
        envKeysParsed = Object.keys(envAux).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(envAux[next]);
            return prev;
        }, {});
    }
    let envKeys = merge(envKeysParsed, {
        'process.env.auth_api': JSON.stringify(process.env.auth_api),
        'process.env.client_id': JSON.stringify(process.env.client_id),
        'process.env.redirect_uri': JSON.stringify(process.env.redirect_uri),
        'process.env.scopes': JSON.stringify(process.env.scopes),
    })

    console.log(envKeys)

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

