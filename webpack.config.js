const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin=require("fork-ts-checker-webpack-plugin");
const CopyPlugin=require("copy-webpack-plugin");
const WebpackBar=require("webpackbar");

module.exports={
    mode:"development",
    entry:{
        index:"./web/pages/index/index.tsx"
    },
    output:{
        path:`${__dirname}/build/build`,
        filename:"[name]-build.js"
    },

    module:{
        rules:[
            {
                test:/\.(tsx|ts|js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-react","@babel/preset-typescript"]
                    }
                }
            },
            {
                test:/\.(less|css)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:"css-loader",options:{url:false}},
                    {loader:"less-loader"}
                ]
            }
        ]
    },

    plugins:[
        new MiniCssExtractPlugin({
            filename:"[name]-build.css"
        }),

        new ForkTsCheckerWebpackPlugin(),
        new WebpackBar(),

        new CopyPlugin({
            patterns:[
                {from:"web/pages/index/index.html",to:".."}
            ]
        }),
    ],

    // optimization:{
    //     splitChunks:{
    //         chunks:"all",
    //         automaticNameDelimiter:"-"
    //     }
    // },

    resolve:{
        extensions:[".tsx",".ts",".jsx",".js"],
        alias:{
            css:`${__dirname}/web/css`,
            components:`${__dirname}/web/components`,
            apis:`${__dirname}/web/apis`,
            hooks:`${__dirname}/web/hooks`,
            lib:`${__dirname}/web/lib`
        }
    },

    stats:{
        entrypoints:false,
        modules:false,
        chunks:false,
        // assets:false
    },

    devtool:"eval-source-map"
};