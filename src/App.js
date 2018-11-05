import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './app.scss';
import { Toolbar } from 'react-md';
import { PureSearch } from 'components/search';
// import { executeLogin } from 'api';

class App extends Component {

  onSearch = (search) => {
    this.setState({ search });
  }

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/app.js</code> and save to reload.
      //     </p>
      //     <Button onClick={() => executeLogin()} />
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <Fragment>
        <Toolbar
          colored
          fixed
          actions={<PureSearch onSearch={this.onSearch} />}
          title="react-app"
        />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/app.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Fragment>
    );
  }
}

export default App;
