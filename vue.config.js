const path = require('path')
const webpack = require('webpack')
const SentryCliPlugin = require('@sentry/webpack-plugin');
const ReplaceAssetsPlugin = require('@dlophin/replace-assets-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { publicPath, productionGzip, useSentry } = require('./h5.conf')
// const pagesEntries = require('./page.config') //多页应用时开启

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    // pages:pagesEntries, //多页应用时入口
    publicPath: publicPath,
    outputDir: 'dist',
    assetsDir: 'static',
    transpileDependencies: [],//node_modules里需要显示转换的依赖
    productionSourceMap: useSentry,
    configureWebpack: config => {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': `'${process.env.NODE_ENV}'`,
                'VUE_APP_WEB_ENV': `'${process.env.VUE_APP_WEB_ENV}'`,
                'VUE_APP_PRODUCT': `'${process.env.VUE_APP_PRODUCT}'`,
                'VUE_APP_PROJECT_NAME': `'${process.env.VUE_APP_PROJECT_NAME}'`,
                'VUE_APP_PROJECT_VERSION': `'${process.env.VUE_APP_PROJECT_VERSION}'`
            }
        }))
        // config.plugins.push(new BundleAnalyzerPlugin())

        config.optimization['runtimeChunk'] = {
            name: 'manifest'
        }

        if(process.env.NODE_ENV === 'production'){
            // gzip压缩配置
            if(productionGzip){
                config.plugins.push(
                    new CompressionWebpackPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' +
                        ['js', 'css'].join('|') +
                        ')$'
                    ),
                    threshold: 10240,
                    minRatio: 0.8
                    })
                )
            }

            // sentry配置
            if(useSentry){
                let urlPrefix = publicPath.match(/^(http[s]?:)?(\/\/[\w\d.\-]+)\/([\S\s]+)/)
                config.plugins.push(
                    new SentryCliPlugin({
                        include: './dist',
                        // ignoreFile: '.sentrycliignore',
                        ignore: ['node_modules'],
                        release: `${process.env.VUE_APP_PROJECT_NAME}-${process.env.VUE_APP_WEB_ENV}@${process.env.VUE_APP_PROJECT_VERSION}`,
                        deleteAfterCompile: true,
                        configFile: `./${process.env.VUE_APP_PRODUCT}.sentry.properties`,
                        urlPrefix: `~/${urlPrefix ? urlPrefix[3] : ''}`,
                    })
                )
                config.plugins.push(    
                    new ReplaceAssetsPlugin({
                        use: {
                            test: /.js$/,
                            regs: [ { test: /\/\/# sourceMappingURL=[a-zA-z\-.0-9]*/g, replace: '' } ]
                        }
                    })
                ) 
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options['transformAssetUrls'] = {
                    video: ['src', 'poster'],
                    source: 'src',
                    img: 'src',
                    image: 'xlink:href'
                }
                return options;
            });
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options['limit'] = 10000
                options['publicPath'] = publicPath
                return options;
            })
        config.module
            .rule('media')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options['limit'] = 10000
                return options;
            })
        config.module
            .rule('fonts')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options['limit'] = 10000
                return options;
            })
    },
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: '<url>',
    //             ws: true,
    //             changeOrigin: true
    //         },
    //     }
    // },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('autoprefixer')({
                        browsers:[
                            'last 7 versions',"Android >= 2.1", "iOS >= 4", "IE >= 8", "Firefox >= 15", "Opera >= 8"
                        ]
                    }),
                    require('postcss-px2rem')({
                        // 以设计稿750为例， 750 / 10 = 75
                        remUnit: 37.5
                    })
                ]
            }
        }
    },
}