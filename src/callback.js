import React, { Component, Fragment } from 'react';
import { exchangeTokenPromise } from 'api';
import { getUrlParam } from 'utils';

class Callback extends Component {
  componentDidMount() {
    this.processLoginCallback();
  }

  async processLoginCallback() {
    await exchangeTokenPromise(getUrlParam('code'));
  }

  render() {
    return <Fragment></Fragment>;
  }
}

export default Callback;