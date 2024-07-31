const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
    return {
        mode: "production",
        entry: {
            main: "./src/js/index.js",
            install: "./src/js/install.js",
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new WebpackPwaManifest({
                name: "JATE",
                short_name: "JATE",
                description: "Take notes with Javascript syntax highlighting!",
                background_color: "#225ca3",
                theme_color: "#225ca3",
                crossorigin: "anonymous", // can be null, use-credentials or anonymous
                icons: [
                    {
                        src: path.resolve("src/images/icon_256x256.png"),
                        sizes: [96, 256], // multiple sizes
                        purpose: "maskable",
                    },
                ],
                inject: true,
                fingerprints: false,
                publicPath: "./", // Ensure correct path resolution
            }),
            new HtmlWebpackPlugin({
                template: "./index.html",
                title: "Webpack Plugin",
            }),
            new MiniCssExtractPlugin(),
            new InjectManifest({
                swSrc: "./src-sw.js",
                swDest: "sw.js",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                },
            ],
        },
    };
};
