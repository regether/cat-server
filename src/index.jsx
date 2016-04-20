import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/*
    组件注释请写在src文件夹下的组件内
*/
let PageComponent = require('../../../examples/' + window.Component + '.js');

ReactDOM.render(<PageComponent />, document.getElementById('react-component-container'));
