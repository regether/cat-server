import LiveReloadPlugin from 'webpack-livereload-plugin';
import webpack from './webpack.base.js';

const build = (entry, output) => {
    var webpackBase = webpack(entry, output);
    var webpackConfig = {
        watch: true,
        devtool: 'source-map',
        plugins:[new LiveReloadPlugin()]
    };

    return Object.assign(webpackBase, webpackConfig);
};

export default build;
