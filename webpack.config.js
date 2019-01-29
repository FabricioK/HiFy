const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge')
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = env => {
    let envKeys = {}
    if (!env.production) {
        const envAux = dotenv.config({ silent: true }).parsed;

        // reduce it to a nice object, the same as before
        envKeys = Object.keys(envAux).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(envAux[next]);
            return prev;
        }, {});
    }
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
            new webpack.DefinePlugin( merge(envKeys, {
                auth_api: JSON.stringify(process.env.auth_api),
                client_id: JSON.stringify(process.env.client_id),
                redirect_uri: JSON.stringify(process.env.redirect_uri),
                scopes: JSON.stringify(process.env.scopes),
            })),
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

