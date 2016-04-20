# ReadME

Develop tool for React Component Development

Remember to follow File Structure Guide of react-salt-component below

## Feature

* support jsx
* support es6

## File Structure Guide

	-assets/ // less files
	-examples/
	-src/ //put your component here
	-readme.md
	-package.json

## Start Server

npm install rs-server

node node_modules/.bin/rs-server   // default port 7777

## Publish

node node_modules/.bin/pre-publish  // Compile files

npm publish

## examples/simple.jsx

```
import React from 'react';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind('this');
    }
    onClick() {
        alert('This is a simple example');
    }
    render() {
        return <button onClick={this.onClick}>This is a simple Example</button>;
    }
};

```

You can add these in your package.json:

```
"scripts" : {
    "dev": "node node_modules/.bin/cat-server",
	"build": "node node_modules/.bin/build",
    "pre-publish": "node node_modules/.bin/pre-publish"
}
```
Then，you can run instead

```
npm run dev
npm run build
```


    组件注释请写在src文件夹下的组件内

