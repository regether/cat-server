#!/usr/bin/env_node
'use strict;'
require('babel-register')({
    "presets": [
        "es2015",
        "stage-0"
    ],
    "plugins": [
        "add-module-exports",
        "transform-es2015-modules-umd"
    ]
});

require("babel-polyfill");

var app = require('./bin/main.js');

app();
