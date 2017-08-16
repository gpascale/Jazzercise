const child_process = require('child_process');
const express = require('express');
const app = express();

// import api once that exists

const port = process.env.port || 3114;

app.set('port', port);

const pythonEnv = Object.assign({ }, process.env, {
  PYTHONUNBUFFERED: '1'
});
var child = child_process.spawn(
  'python',
  ['run-api.py'],
  { env: pythonEnv, cwd: 'generation' }
);
child.stdout.on('data', function(data) {
  console.log(data.toString('utf8'));
});
child.stderr.on('data', function(data) {
  console.error(data.toString('utf8'));
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('app listening on', port);
  console.log('environment: ' + process.env.NODE_ENV);
});
