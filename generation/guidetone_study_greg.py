import music21_utils as m21utils
import music21 as m21
from music21.duration import Duration
from music21.chord import Chord
from music21.stream import Measure
from music21.harmony import ChordSymbol
from music21.note import Note
from music21 import converter

def generate(tune, clef=m21.clef.TrebleClef()):
    # Load in the score
    score = m21utils.loadScoreForTune(tune)

    # Some basic preprocessing / cleanup
    score.parts[0].removeByClass('Instrument')
    score.parts[0].partName = None
    m21.harmony.realizeChordSymbolDurations(score) ## Argh!!!

    # Go measure by measure and build the study
    measures = score.parts[0].getElementsByClass("Measure")
    for measure in measures:
        print measure
        # Remove any existing notes in the measure (we're about to add our own)
        measure.removeByClass('Note')
        # Grab the list of chord symbols in this measure
        chordSymbols = measure.getElementsByClass('ChordSymbol').matchingElements()
        # Remove the chord symbols so we can add them back interleaved with the notes
        # we're about to add
        measure.removeByClass('ChordSymbol')
        # Add notes for each chord symbol
        for symbol in chordSymbols:
            measure.append(symbol)
            print symbol.duration.quarterLength
            n3 = Note(symbol.third)
            n3.duration = Duration(symbol.duration.quarterLength * 0.50)
            n3.octave = 5
            n3.lyric = '3'
            measure.append(n3)
            if (symbol.containsSeventh()):
                n7 = m21.note.Note(symbol.seventh)
                n7.duration = Duration(symbol.duration.quarterLength * 0.50)
                n7.lyric = '7'
                n7.octave = 5
                measure.append(n7)
            else:
                n5 = m21.note.Note(symbol.root())
                n5.duration = Duration(symbol.duration.quarterLength * 0.50)
                n5.lyric = 'R'
                n5.octave = 5
                measure.append(n5)
            # TODO: don't think this is needed
            # if measure.number % 4 == 0:
                # measure.append(m21.layout.SystemLayout(isNew=True))

    # for x in range(len(c)):
    # MyMeasure = Measure() ## Make a measure and put everything inside it
    # MyMeasure.number = m.number  ## give the measure a number
    # MyMeasure.rightBarline = m.rightBarline
    # MyMeasure.leftBarline = m.leftBarline
    # # print("_____________________")
    # # print("In measure "+ str(m.number) + "(" + str(m.id) + ")" +" of " + str(len(s)) ) #debug monitoring
    # c = m.getElementsByClass(ChordSymbol)
    # for x in range(len(c)):
    #     # print(c[x].duration)
    #     # print(c[x].beat)
    #     # print (c[x].figure)
    #     # print("--------------------")
    #     TheFigure = c[x].figure
    #     MyChord = Chord(c[x].pitches)
    #     MySymbol = ChordSymbol()
    #     ######## Fix XML chord symbols ############
    #     if (TheFigure.find(" alter b9") != -1):
    #     MySymbol = m21utils.writeFlatNine(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find(" add b9") != -1):
    #     MySymbol = m21utils.writeFlatNine(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find(" add #9") != -1):
    #     MySymbol = m21utils.writeSharpNine(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find(" add #7") != -1):
    #     MySymbol = m21utils.writeSharpSeven(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find(" add #11") != -1):
    #     MySymbol = m21utils.writeSharpEleven(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find(" add b13") != -1):
    #     MySymbol = m21utils.writeFlatThirteen(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find(" add b6") != -1):
    #     MySymbol = m21utils.writeFlatSix(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find(" alter b5") != -1):
    #     MySymbol = m21utils.writeHalfDim(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find(" alter #5") != -1):
    #     MySymbol = m21utils.writeSharpFive(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     elif (TheFigure.find("pedal") != -1):
    #        MySymbol = m21utils.writePedal(MyMeasure, c[x].pitches[0].name,c[x].duration,c[x].chordKind)
    #     else:
    #      if (c[x].duration.type != "zero"):
    #         if (c[x].root().name != c[x].bass().name):
    #         # print (c[x].root().name, c[x].bass().name)
    #         MySymbol = ChordSymbol(root=c[x].root(), bass=c[x].bass(), kind=c[x].chordKind)
    #         else:
    #         MySymbol = ChordSymbol(root=c[x].root(), bass=c[x].root(), kind=c[x].chordKind)
    #         MySymbol.duration = c[x].duration
    #         MyMeasure.append(MySymbol)
    #         # print("Wrote chord " + str(MySymbol.figure) + "...")
    #     n3 = Note(MySymbol.third)
    #     n3.duration = Duration(c[x].duration.quarterLength * 0.50)
    #     # n3.lyric = '3rd'
    #     n3.octave = 5
    #     MyMeasure.append(n3)
    #     if (MySymbol.containsSeventh()):
    #     n7 = m21.note.Note(MySymbol.seventh)
    #     n7.duration = Duration(c[x].duration.quarterLength * 0.50)
    #     # n7.lyric = '7th'
    #     n7.octave = 5
    #     MyMeasure.append(n7)
    #     else:
    #     n5 = m21.note.Note(MySymbol.root())
    #     n5.duration = Duration(c[x].duration.quarterLength * 0.50)
    #     # n5.lyric = 'R'
    #     n5.octave = 5
    #     MyMeasure.append(n5)
    #     if ((m.number)%4 == 0):
    #     sl = m21.layout.SystemLayout(isNew=True)
    #     MyMeasure.append(sl)
    # MyScore.append(MyMeasure)

    # Set metadata
    title = tune + ' - Guide Tone Study'
    score.metadata = m21.metadata.Metadata()
    score.metadata.title = title
    score.metadata.movementName = ' ' # For some reason this works, None and '' don't...
    score.metadata.composer = 'Greg Pascale'

    return score
