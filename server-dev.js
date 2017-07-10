const express = require('express');
const app = express();

// import api once that exists

const port = process.ENV.port || 3114;

app.set('port', port);

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('app listening on', port);
  console.log('environment: ' + process.env.NODE_ENV);
});
