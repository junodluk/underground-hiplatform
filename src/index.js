import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.scss';
import App from './app';
import Callback from './callback';
import * as serviceWorker from './serviceWorker';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const routing = (
  <Router>
    <Switch>
      <Route path="/callback" component={Callback} />
      <Route component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
