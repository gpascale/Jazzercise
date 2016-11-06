import React from 'react';
import ReactDOM from 'react-dom';
const abcjs = require("imports?window=>{}!exports?window.ABCJS!ext/abcjs.js")

function cleanupAbc(abcText) {
  var ret = abcText;
  ret = ret.replace(/\$/g, '');
  return ret;
}

export default class SvgScore extends React.Component {

  render() {
    return (
      <div className="abcscore" id="score" ref="score">
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.abcText != this.props.abcText) {
      this._renderAbc(nextProps.abcText);
    }
  }

  componentDidMount() {
    var self = this;
    if (this.props.abcText)
      this._renderAbc(this.props.abcText);

    // TODO: This is a little gross
    window.onresize = (event) => self._renderAbc(self.props.abcText);
  }

  _renderAbc(abcText) {
    const elementWidth = ReactDOM.findDOMNode(this.refs.score).offsetWidth;
    console.log('element width is ' + elementWidth);
    const abcTextCleaned = cleanupAbc(abcText);
    var desiredWidth = elementWidth;
    var padding = 20;
    var opts = {
      staffwidth: desiredWidth - 2 * padding,
      paddingleft: padding,
      paddingright: padding
    }
    abcjs.renderAbc('score', abcTextCleaned, null, opts);
  }

}