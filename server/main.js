var  _            = require('lodash');
var  fs           = require('fs');
var  path         = require('path');
var  React        = require('react');
var  koa          = require('koa');
var  koarouter    = require('koa-router');
var  koastatic    = require('koa-static');
var  highlight    = require('highlight').Highlight;
var  marked       = require('marked');

var app = koa(),
    router = koarouter();

var __root = function (dir) { return path.join(path.dirname(__dirname), dir); };
var layout = fs.readFileSync(__root('layout.html'));
var files = fs.readdirSync('examples'),
    jsxReg = new RegExp('.jsx$'),
    navList = files.filter(function (filename) {
        return jsxReg.test(filename);
    }).map(function (filename) {
        return `/examples/${filename.split('.')[0]}`;
    });
navList.unshift('/readme');

//readme
router.get('/readme', function *(next) {
  var readme = fs.readFileSync('readme.md', 'utf8');
  var data = {
        navList: navList,
        script: false,
        readme: marked(readme),
        code: false
      };
  this.body = _.template(layout)(data);
});

//examples
router.get('/examples/:example', function *(next) {
  var example = this.params.example;
  var cwd = process.cwd();
  var filePath = `${cwd}/examples/${example}.jsx`;
  var readmeFileName = `${cwd}/examples/${example}.md`;
  var readme = fs.existsSync(readmeFileName) ? fs.readFileSync(readmeFileName, 'utf8') : '';
  var data = {
        navList: navList,
        script: example,
        readme: marked(readme),
        code: highlight(fs.readFileSync(filePath, 'utf8'))
    };

  this.body =  _.template(layout)(data);
});

//redirect
router.redirect('/', '/readme');

//process static file service
app.use(koastatic(__root('assets')));
app.use(koastatic(__root('build')));
app.use(koastatic(__root('src')));

app.use(router.routes());

var port = process.env.PORT || 7777;
app.listen(port);
console.log('Server started on ' + port);
