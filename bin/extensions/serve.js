#!/usr/bin/env node
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import koa from 'koa';
import koarouter from 'koa-router';
import koastatic from 'koa-static';
import Highlight from 'highlight';
import marked from 'marked';
import open from 'open';

import checkfile from './checkfile';
import logger from './logger';

let pojDir = process.cwd();
let highlight = Highlight.Highlight;
let paths = {
    manuelPath: path.resolve(__dirname, '../options/manuel'),
    assetsPath: path.resolve(__dirname, '../../assets'),
    tmp: path.resolve(__dirname, '../../.tmp'),
    projectPath: pojDir
};
let layout = fs.readFileSync(paths.manuelPath + '/layout.html');
let files = fs.readdirSync(paths.projectPath + '/examples');

let navList = files.filter(filename => {
    return /.js$/.test(filename);
}).map(filename => {
    return `/examples/${filename.split('.')[0]}`;
});
navList.unshift('/readme');

let exportEX = function *(next) {
    logger.success('-------> GET: example', example, '\n');
    let { example } = this.params;
    let filePath = `${paths.projectPath}/examples/${example}.js`;
    let originFile = fs.readFileSync(filePath, 'utf8');
    let comments = [];
    let codes = [];

    originFile.split('*/').forEach(function(item) {
        var tmp = item.split('/*');
        comments.push(tmp[1]);
        if (tmp[0] !== '') {
            codes.push(tmp[0]);
        }
    });

    this.body =  _.template(layout)({
        navList: navList,
        script: example,
        readme: marked(comments.join('')),
        code: highlight(codes.join(''))
    });
}

const serve = () => {
    let app = koa();
    let router = koarouter();

    // router: readme
    router.get('/readme', function *(next) {
        logger.success('-------> GET: readme\n');
        let readme = checkfile('readme.md') ? fs.readFileSync(path.join(paths.projectPath, 'readme.md'), 'utf8') : '';
        this.body = _.template(layout)({
            navList: navList,
            script: false,
            readme: marked(readme),
            code: false
        });
    });

    // router: examples
    router.get('/examples/:example/*', exportEX);
    router.get('/examples/:example', exportEX);

    // redirect
    router.redirect('/', '/readme');

    // 静态资源
    app.use(koastatic(paths.assetsPath));
    app.use(koastatic(path.join(paths.tmp, 'build')));
    app.use(koastatic(path.join(paths.projectPath, 'src')));

    // 启动路由
    app.use(router.routes());

    // 定义接口
    var config = checkfile('package.json') ? require(path.join(paths.projectPath, 'package.json')) : {};
    var port = (config.salt && config.salt.port) || 7777;

    // 项目启动
    app.listen(port);
    logger.success('------->   Server started on ', port);
    logger.in(5);

    // 启动浏览器
    open('http://localhost:' + port);
}

export default serve;
