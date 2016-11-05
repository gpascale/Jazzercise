import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from '../components/hello/Hello';
import Score from '../components/score/Score';
import SvgScore from '../components/svgscore/SvgScore';
import AbcScore from '../components/abcscore/AbcScore';

require('../scss/bundle.scss');

const muiTheme = getMuiTheme({
  appBar: {
    height: 40,
  }
});

ReactDOM.render(
  <div className="container">
    <MuiThemeProvider muiTheme={muiTheme}>
      <AppBar title="Study Generator"/>
    </MuiThemeProvider>
    <div className="content">
      <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
	<Route path="/" component={AbcScore}>
	</Route>
      </Router>
    </div>
  </div>
  , document.getElementById('react-root'));