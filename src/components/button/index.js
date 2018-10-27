import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button { ...this.props } >
        The button text!!!
      </button>
    );
  }
}

export { Button };