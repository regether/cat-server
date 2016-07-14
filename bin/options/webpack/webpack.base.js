import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const __root = dir => path.resolve(__dirname, '../../../node_modules/', dir);

let babelLoader = __root('babel-loader');
let cssLoader = __root('css-loader');
let styleLoader = __root('style-loader');
let postcssLoader = __root('postcss-loader');
let urlLoader = __root('url-loader');

let sassArr = [styleLoader, cssLoader, postcssLoader];

const base = (entry, output) => {
    return {
        module: {
            loaders: [
                {
                    test: /\.(es6|js|jsx)$/, loader: babelLoader,
                    query: {
                        presets: ['es2015', 'react', 'stage-1'],
                        plugins: ['add-module-exports']
                    }
                },
                { test: /\.(png|jpg|jpeg)$/, loader: urlLoader},
                { test: /\.(css|scss)$/, loader: sassArr.join('!')}
            ]
        },
        postcss: function () {
            return [precss, autoprefixer];
        },
        entry: [
            entry
        ],
        output: {
          filename: 'main.js',
          path: output
        },
        resolve: {
          extensions: ['', '.js', '.jsx'],
        }
    };
};

export default base;
