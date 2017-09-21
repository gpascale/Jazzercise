const fs = require('fs');
const iRealReader = require('ireal-reader');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/songs.db');

const home = process.env.HOME;
const Measure = require('./measure');

const songsByTitle = { };

if (process.argv.length < 3) {
  console.log('Usage: node ireal-to-abc.js <iReal file>');
  process.exit(1);
}
const iRealFile = process.argv[2];

fs.readFile(iRealFile, 'utf8', (err, data) => {
  if (err) throw err;
  const iRealData = new iRealReader(data);

  iRealData.songs.forEach(song => {
    songsByTitle[song.title] = song.music;
  });

  // write out all songs
  const songs = iRealData.songs.map(song => {
    console.log('Converting', song.title);
    return convert(song);
  });


  let insert = db.prepare('INSERT INTO songs (composer, title, key, measures) VALUES (?, ?, ?, ?) ON CONFLICT REPLACE');
  songs.forEach(({ composer, title, key, measures }) => {
    insert = insert.run(composer, title, key, JSON.stringify(measures));
    console.dir(insert);
  });

  insert.finalize();
  console.log(insert);

});

const cleanup = (measures) => {
  return measures.map(measure => {
    let ret = measure.replace(/XyQ/g, ''); // seems to mean nothing
    // ret = ret.replace(, ''); // remove section labels
    ret = ret.replace(/Y+/g, ''); // vertical spacers
    ret = ret.replace(/Z$/, ''); // end of song
    ret = ret.replace(/^U/g, ''); // not sure
    ret = ret.replace(/,/g, ' '); // commas seem to be used to render multiple small chords. Just break them up
    // TODO: This is a little aggressive - it replaces valid characters in descriptions. e.g. Solos -> soo
    ret = ret.replace(/s|l/g, ''); // size markers
    return ret;
  }).filter(measure => measure);
};

const extractMeta = (measures) => {
  return measures.map(raw => {
    let ret = new Measure({ chords: raw });
    // Text - instructions etc... - should appear between < and >
    const text = raw.match(/<(.*)>/);
    if (text) {
      ret['text'] = text[1];
      raw = raw.replace(/<(.*)>/, '');
    }
    // Section - *A, *B, etc...
    const section = raw.match(/^(\*A|\*B|\*C|\*D|\*v|\*i)/);
    if (section) {
      ret['section'] = section[0];
      raw = raw.replace(/^(\*A|\*B|\*C|\*D|\*v|\*i)/, '');
    }
    // repeat start - first character will be '{'
    if (raw.match(/^{/)) {
      ret['repeatStart'] = true;
      raw = raw.replace(/^{/, '');
    }
    // repeat end - last character will be '}'
    if (raw.match(/}$/)) {
      ret['repeatEnd'] = true;
      raw = raw.replace(/}$/, '');
    }
    // Time signature - will start with T[0-9][0-9]
    const ts = raw.match(/^T([0-9]{1,4})/);
    if (ts) {
      // console.log('ts', ts);
      // console.log('raw', raw);
      ret['timeSignature'] = ts[1];
      raw = raw.replace(/^T[0-9]{1,4}/, '');
    }
    // 1st ending, 2nd ending... - will start with N#
    const ending = raw.match(/^N([0-9])/);
    if (ending) {
      ret['ending'] = ending[1];
      raw = raw.replace(/^N([0-9])/, '');
    }
    ret.chords = raw.trim();
    return ret;
  }).filter(measure => measure.chords);
};

const expandRepeats = (measures) => {
  const ret = [ ];
  measures.forEach(measure => {
    let raw = measure.chords;
    let repeat = false;
    if (raw.match(/Kc$/)) {
      raw = raw.replace(/Kc$/, '');
      repeat = true;
    }
    measure.chords = raw.split(' ');
    ret.push(measure);
    if (repeat)
      ret.push(new Measure( { chords: measure.chords }));
  });
  return ret;
};

const convert = (song) => {
  const { music, title, key, composer } = song;
  const measureDelim = /p|\||LZ|]|\[|{|}/g;
  let measures = music.raw.split(measureDelim);
  measures = cleanup(measures);
  measures = extractMeta(measures);
  measures = expandRepeats(measures);

  return {
    title,
    composer,
    key,
    measures: measures
  };

  // fs.writeFile(`out/${title}.json`, JSON.stringify(measures, null, 2), 'utf8', function (err) {
  //   if (err) {
  //     return console.log('error writing', title, JSON.stringify(err));
  //   }
  // });

};



