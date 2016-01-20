import React, { Component } from 'react';

export default class Advanced extends Component {
    alert() {
        console.log(arguments);
        alert('So easy!');
    }

    render() {
        return <div onClick={this.alert.bind(this)}>Click here!</div>;
    }
}
