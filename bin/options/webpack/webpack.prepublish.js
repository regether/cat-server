let projectConf;
let defaultConf = {
    externals: [{
        'react': {
          amd: 'react',
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react'
        },
        'react-dom': {
          amd: 'react-dom',
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom'
        }
    }]
};

try {
    projectConf = require(path.resolve(process.cwd(), './rs_webpack_option.js'));
} catch (ex) {
    projectConf = defaultConf;
}

const pre = (entry, output) => {
    let arr = output.split('/');
    let lab = arr[arr.length - 3];
    let webpackBase = require('./webpack.base.js')(entry, output);

    let webpackConfig = {
        output: {
          filename: 'main.js',
          path: output,
          library: lab,
          libraryTarget: 'umd'
        }
    };

    return Object.assign(webpackBase, webpackConfig, projectConf);
};

export default pre;
