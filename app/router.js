import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import App from './root';
import Player from './page/player';
import List from './page/list';

let Root = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player} />
          <Route path="/list" component={List}></Route>
        </Route>
      </Router>
    );
  }
});

export default Root;