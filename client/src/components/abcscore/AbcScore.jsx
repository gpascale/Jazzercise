import React from 'react';
import ReactDOM from 'react-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
const abcjs = require("imports?window=>{}!exports?window.ABCJS!ext/abcjs.js")

function cleanupAbc(abcText) {
  if (!abcText) {
    return null;
  }
  var ret = abcText;
  ret = ret.replace(/\$/g, '');
  ret = "%%staffsep 50\n" + ret;
  return ret;
}

var AbcScore = React.createClass({

  getInitialState: function() {
    return {
      viewingSource: false,
      abcText: false
    };
  },

  render: function() {
    return (
      <div className="abcscore">
	<div className="score" ref="score" id="score">
	  { /* ABCJS-renders here */ }
	</div>
	<IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
		  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		  targetOrigin={{horizontal: 'right', vertical: 'top'}}
		  style={{position: 'absolute', top: 0, right: 0}}>
	  <MenuItem primaryText="View Source" onClick={() => this.setState({ viewingSource: true })}/>
	</IconMenu>
	<Dialog title="View Source"
		modal={false}
		open={this.state.viewingSource}
		onRequestClose={() => this.setState({viewingSource: false})}>
	  <pre>
	    {cleanupAbc(this.props.abcText)}
	  </pre>
	</Dialog>
      </div>
    )
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.abcText != this.props.abcText) {
      this._renderAbc(nextProps.abcText);
    }
  },

  componentDidMount: function() {
    var self = this;
    if (this.props.abcText)
      this._renderAbc(this.props.abcText);

    // TODO: This is a little gross
    window.onresize = (event) => self._renderAbc(self.props.abcText);
  },

  _renderAbc: function(abcText) {
    const elementWidth = ReactDOM.findDOMNode(this.refs.score).offsetWidth;
    const abcTextCleaned = cleanupAbc(abcText);
    var desiredWidth = elementWidth;
    var paddingH = 20;
    var paddingV = 30;
    var opts = {
      staffwidth: desiredWidth - 2 * paddingH,
      paddingleft: paddingH,
      paddingright: paddingH,
      paddingtop: paddingV,
      paddingbottom: paddingV,
    }
    abcjs.renderAbc('score', abcTextCleaned, null, opts);
  }

});

export default AbcScore;