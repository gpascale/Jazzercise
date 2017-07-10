import music21_utils as m21utils
import music21 as m21
from music21.duration import Duration
from music21.chord import Chord
from music21.stream import Measure, Score, Part
from music21.harmony import ChordSymbol
from music21.note import Note
from music21.bar import Repeat
from music21 import harmony

import sqlite3
import json

db_conn = sqlite3.connect('../db/songs.db', check_same_thread=False)


def generate(tune, clef=m21.clef.TrebleClef()):
    c = db_conn.cursor()
    c.execute('SELECT key, measures FROM songs WHERE title=?', (tune,))
    [(key, measures)] = c.fetchall()
    c.close()

    the_score = Score()
    m21.harmony.realizeChordSymbolDurations(the_score) ## Needed to make this work!
    the_score.metadata = m21.metadata.Metadata()
    the_score.metadata.title = tune + ' - Guide Tone Study'
    the_score.metadata.movementName = ' ' # For some reason this works, None and '' don't...
    the_score.metadata.composer = 'Greg Pascale'
    the_part = Part()
    the_score.append(the_part)

    measures = json.loads(measures)
    measureNum = 0
    for measure in measures:
        m = Measure()
        m.number = measureNum

        print measure

        chords = measure['chords'] if (len(measure['chords']) <= 2) else [ measure.chords[0] ]
        numChords = len(chords)

        for chord in chords:
            root = chord[0]
            kind = chord[1:]
            # print root, kind
            chordSymbol = harmony.ChordSymbol(root=root, bass=root, kind='minor')
            chordSymbol.duration = Duration(4 / numChords)
            m.append(chordSymbol)

            n = Note(chordSymbol.third)
            n.duration = chordSymbol.duration
            n.octave = 5
            m.append(n)

        if 'repeatStart' in measure and measure['repeatStart'] == True:
            print 'start repeat!'
            m.leftBarline = Repeat(direction='start')
        if 'repeatEnd' in measure and measure['repeatEnd'] == True:
            print 'end repeat!'
            m.rightBarline = Repeat(direction='end')

        the_part.append(m)

        measureNum += 1

    measureNum = 0
    for measure in measures:
        if 'ending' in measure:
            print 'ending', measure['ending']
            m21.repeat.insertRepeatEnding(the_part, measureNum, measureNum, measure['ending'], inPlace=True)
        measureNum += 1


    # print 'printing all the measures...'
    # mn = 0
    # for m in the_part:
    #     print m
    #     print mn
    #     print the_part.measure(mn)
    #     mn += 1

    return the_score


