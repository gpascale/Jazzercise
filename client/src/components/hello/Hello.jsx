import React from 'react';
const guy = require('assets/images/guy-fieri.jpg');

var Hello = React.createClass({
  render: () => {
    return (
      <div className="hello">
	Hello world!
	<img src={guy} />
      </div>
    );
  }
});

export default Hello;