import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let PageComponent = require('../examples/' + window.Component + '.jsx');
//let PageComponent = require('../../../examples/' + window.Component + '.jsx');

ReactDOM.render(<PageComponent />, document.getElementById('react-component-example'));
