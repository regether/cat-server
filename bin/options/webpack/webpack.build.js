import LiveReloadPlugin from 'webpack-livereload-plugin';
import webpack from './webpack.base.js';

const build = (entry, output) => {
    let webpackBase = webpack(entry, output);
    let webpackConfig = {
        watch: true,
        devtool: 'source-map',
        plugins:[new LiveReloadPlugin()]
    };

    return Object.assign(webpackBase, webpackConfig);
};

export default build;
