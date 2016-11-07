import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from '../components/hello/Hello';
import Score from '../components/score/Score';
import SvgScore from '../components/svgscore/SvgScore';
import AbcScore from '../components/abcscore/AbcScore';
import StudyPage from '../components/studypage/StudyPage';

require('../scss/bundle.scss');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 40,
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="container">
      <AppBar title="Jazzercise"/>
      <div className="content">
	<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
	  <Route path="/" component={StudyPage}>
	  </Route>
	</Router>
      </div>
    </div>
  </MuiThemeProvider>
  , document.getElementById('react-root'));