import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let PageComponent = require('../../../examples/' + window.Component + '.js');

ReactDOM.render(<PageComponent />, document.getElementById('react-component-container'));
