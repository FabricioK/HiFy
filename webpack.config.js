const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
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
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};