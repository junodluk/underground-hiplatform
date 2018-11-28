import React, { Component } from 'react';
class Button extends Component {
  render() {
    const { label = 'The button text!!!' } = this.props;
    return (
      <button { ...this.props } >
        {label}
      </button>
    );
  }
}

export { Button };