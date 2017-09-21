const sqlite = require('sqlite3');
const db = new sqlite.Database('db/songs.db');
const study = require('./study');
const log = require('./log');

// TODO: Make this a library function somewhere
function sendResult200(req, res, result) {
  res.status(200).send({ result: result });
}
function sendError404(req, res, error) {
  res.status(404).send({ error });
}
function sendResult200OrError404(req, res, error, result) {
  if (error)
    sendError404(req, res, error);
  else
    sendResult200(req, res, result);
}

module.exports = function(app) {
  app.get('/api/tunes', (req, res) => {
    db.all('SELECT title from songs', (err, rows) => {
      if (err) {
        sendError404(req, res, err);
        return;
      }
      const result = rows.map(({ title }) => title);
      sendResult200(req, res, result);
    });
  });

  app.get('/api/study/:tuneid', (req, res) => {
    log.info('sending message to child...');
    study.generate('Oleo', (err, studyResult) => {
      if (err) {
        cb(err);
        return;
      }
      sendResult200(req, res, studyResult);
    });
  });

  return this;
};