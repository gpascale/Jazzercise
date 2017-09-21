const child_process = require('child_process');
const log = require('./log');

let nextMessageId = 1;
const callbacks = [ ];

module.exports = {
  Subprocess: function(process) {
    this.process = process;

    this.sendMessage(command, args, cb) => {
      const messageId = nextMessageId++;
      const message = {
        command,
        args,
        id: messageId
      };
      callbacks[messageId] = cb;
      this.process.stdin.write(JSON.stringify(message));
    });
  }
}

function getChildProcess() {
  if (!global_child)
    global_child = spawnChildProcess();
  return global_child;
}

exports.sendMessage = function(message) {
  const child = getChildProcess();
  log.info('child', child);
  child.stdin.write(message + '\n');
};