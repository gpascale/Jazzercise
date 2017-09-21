const { exec } = require('child_process');
const log = require('./log');

const PYTHON = '~/miniconda3/envs/jazz27/bin/python';

exports.generate = function(tuneName, cb) {
  const cmd = `${PYTHON} generate-study.py "${tuneName}"`;
  const opts = { cwd: `${__dirname}/../../generation` };

  log.info('cmd:', cmd);
  log.info('opts:', opts);

  exec(cmd, opts, (err, stdout, stderr) => {
    if (err) {
      log.error('generate-study error:', err);
      cb(err);
      return;
    }

    log.error('generate-study stderr:', stderr);

    const lines = stdout.split('\n');
    stdout.split('\n').forEach(line => {
      log.info('generate-study stdout', line);
    });

    try {
      const result = JSON.parse(lines[lines.length - 2]);
      cb(null, result);
    }
    catch(e) {
      cb(e);
    }
  });

};