import React from 'react';
import AbcScore from '../abcscore/AbcScore'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import _ from 'underscore'
import common from 'src/js/common'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var StudyPage = React.createClass({

  getInitialState() {
    return {
      abcText: null,
      selectedTune: "A Felicidade",
      tunes: [ "A Felicidade", "All The Things You Are", "Giant Steps" ]
    };
  },

  render: function() {
    var self = this;
    console.log('render - abcText is ' + this.state.abcText);

    var tuneList = _.map(this.state.tunes, function(tune, idx) {
      return ( <MenuItem key={idx} value={tune} primaryText={tune} /> );
    });

    return (
      <div className="studyPage">
	<div className="controls">
	  <span className="dropdownLabel tuneDropdownLabel">Tune:</span>
	  <DropDownMenu ref="tuneDropdown" value={this.state.selectedTune}
			iconStyle={{fill: 'black'}} underlineStyle={{color: 'black'}}
			onChange={(event, index, value) =>
			  self.setState({selectedTune: value}, self._fetchStudy)
			}>
	    {tuneList}
	  </DropDownMenu>
	</div>
	<AbcScore abcText={this.state.abcText}/>
      </div>
    );
  },

  componentDidMount: function() {
    this._fetchStudy();
  },

  _fetchStudy: function() {
    var self = this;
    var url = 'http://localhost:5001/api/generateStudy?tune=' + this.state.selectedTune;
    common.GETJSON(url, function(result) {
      self.setState({
	abcText: result.abc
      });
    });
  }

});

module.exports = StudyPage;