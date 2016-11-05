import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../components/hello/Hello';

require('../scss/bundle.scss');


ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
  , document.getElementById('react-root'));