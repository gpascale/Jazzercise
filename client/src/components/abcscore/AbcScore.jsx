const abcjs = require("imports?window=>{}!exports?window.ABCJS!ext/abcjs.js")
const abcMusic = require('raw!assets/afelicidade.abc');

import React from 'react';

function cleanupAbc(abcText) {
  var ret = abcText;
  ret = ret.replace(/\$/g, '');
  return ret;
}

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
    const abcMusicCleaned = cleanupAbc(abcMusic);
    console.log(abcMusicCleaned);
    abcjs.renderAbc('score', abcMusicCleaned);
  }

}