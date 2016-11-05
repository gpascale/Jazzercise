const abcjs = require("imports?window=>{}!exports?window.ABCJS!ext/abcjs.js")
const abcMusic = require('raw!afelicidade.abc');

import React from 'react';

export default class SvgScore extends React.Component {

  render() {
    console.dir(abcjs)
    return (
      <div className="score" id="score" ref="score">
	ABC Score
      </div>
    )
  }

  componentDidMount() {
    console.log("Rendering abc...");
    var ret = abcjs.renderAbc('score', abcMusic);
    console.dir(ret);
  }

}