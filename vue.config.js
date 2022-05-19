const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const BASE_URL = require('./src/api/base');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = defineConfig({
	publicPath: '/wx-js-sdk',
	transpileDependencies: true,
    devServer: {
        proxy: {
            '/api-uaa': {
                target: BASE_URL.baseUrl, 
                changeOrigin: true
            },
            '/api-pbm-production': {
                target: BASE_URL.baseUrl, 
                changeOrigin: true
            },
            '/cgi-bin': {
                target: BASE_URL.weixin, 
                changeOrigin: true
            },
            '/node': {
                target: BASE_URL.baseUrlNode, 
                changeOrigin: true
            },
            '/cv': {
                target: BASE_URL.weixin, 
                changeOrigin: true
            },
        }
    },
	chainWebpack: config => {
        /**快捷路径的配置*/ 
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@common', resolve('src/common'))
            .set('@pages', resolve('src/pages'))
            .set('@components', resolve('src/components'))
            .set('@assets', resolve('src/assets'))
            .set('@api', resolve('src/api'))
            .set('@public', resolve('public'));
        config.plugins['delete']('prefetch'); /**取消预加载*/ 
    },
     // 生产环境禁止使用debugger、console.log
     configureWebpack: config => {
        /**忽略 */
        config.externals = {
            'fastclick': 'FastClick',
            'FastClick': 'FastClick',
        };
    }
})
