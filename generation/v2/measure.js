
let Measure = function(opts) {
  if (!opts || !opts.chords)
    throw 'chords are required';
  opts = Object.assign(
    { },
    opts
  );
  Object.keys(opts).forEach(k => {
    this[k] = opts[k];
  });
};

Measure.prototype.print = function(i) {
  console.log('Measure:', typeof(i) == 'number' ? i : '');
  Object.keys(this).forEach(k => {
    console.log('\t', k, ':', this[k]);
  });
};

module.exports = Measure;