import React, { Component } from 'react';
import logo from './logo.svg';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        { this.props.title }
      </button>
    )
  }
}

export default Button;
