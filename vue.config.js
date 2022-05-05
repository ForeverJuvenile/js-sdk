const { defineConfig } = require('@vue/cli-service');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = defineConfig({
	publicPath: '/wx-js-sdk',
	transpileDependencies: true,
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
    configureWebpack: config => {
        /**打包忽略 */
        config.externals = {
            'FastClick': 'fastclick',
        };
    }
})
