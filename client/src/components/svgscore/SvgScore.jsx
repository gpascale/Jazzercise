import React from 'react';
const afelicidade = require('assets/images/afelicidade.svg');

export default class SvgScore extends React.Component {

  render() {
    return (
      <div className="score" id="score" ref="score">
	<img src={afelicidade} />
      </div>
    )
  }

}