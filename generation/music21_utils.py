import music21
from music21 import harmony, converter
import os
import subprocess

MUSICXML_PATH = '../musicxml'

def loadScoreForTune(tune):
    return loadScore(filenameForTune(tune))

def loadScore(filename):
    return converter.parseFile(filename)

def filenameForTune(tune):
    return os.path.join(MUSICXML_PATH, tune + '.xml')

# Music21 only seems to support writing to a file - not to a string.
# This function implements writing to a string by writing to a temp file,
# reading the file and returning the result, deleting the temp file
# when finished
def writeToString(music21Object, fmt=None):
    fp = music21Object.write(fmt='musicxml', fp=None)
    ret = ''
    with open(fp, 'r') as f:
	ret = f.read()
    os.remove(fp)
    return ret


def writeToAbc(music21Object):
    fp = music21Object.write(fmt='musicxml', fp=None)
    command = [ 'python', 'xml2abc.py', '-b', '4', fp ]
    result = subprocess.check_output(command)
    return result


def xmlToAbc(xmlPath):
    command = [ 'python', 'xml2abc.py', '-b', '4', xmlPath ]
    result = subprocess.check_output(command)
    return result


###############################################################################
#  Chord symbol rewriting utilities from Daniel
###############################################################################
def writeFlatNine(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind=Kind)
    MySymbol.duration = Duration
    hd = harmony.ChordStepModification()
    hd.type = 'add'
    hd.interval = -1
    hd.degree = 9
    MySymbol.addChordStepModification(hd)
    MyMeasure.append(MySymbol)
    return(MySymbol)

def writeSharpNine(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind=Kind)
    MySymbol.duration = Duration
    hd = harmony.ChordStepModification()
    hd.type = 'add'
    hd.interval = 1
    hd.degree = 9
    MySymbol.addChordStepModification(hd)
    MyMeasure.append(MySymbol)
    return(MySymbol)

def writeSharpSeven(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind=Kind)
    MySymbol.duration = Duration
    hd = harmony.ChordStepModification()
    hd.type = 'add'
    hd.interval = 1
    hd.degree = 7
    MySymbol.addChordStepModification(hd)
    MyMeasure.append(MySymbol)
    return(MySymbol)

def writeSharpEleven(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind=Kind)
    MySymbol.duration = Duration
    hd = harmony.ChordStepModification()
    hd.type = 'add'
    hd.interval = 1
    hd.degree = 11
    MySymbol.addChordStepModification(hd)
    MyMeasure.append(MySymbol)
    return(MySymbol)

def writeFlatThirteen(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind=Kind)
    MySymbol.duration = Duration
    hd = harmony.ChordStepModification()
    hd.type = 'add'
    hd.interval = -1
    hd.degree = 13
    MySymbol.addChordStepModification(hd)
    MyMeasure.append(MySymbol)
    return(MySymbol)

def writeFlatSix(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind=Kind)
    MySymbol.duration = Duration
    hd = harmony.ChordStepModification()
    hd.type = 'alter'
    hd.interval = -1
    hd.degree = 13
    MySymbol.addChordStepModification(hd)
    MyMeasure.append(MySymbol)
    return(MySymbol)

def writeHalfDim(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind='half-diminished')
    MySymbol.duration = Duration
    MyMeasure.append(MySymbol)
    return(MySymbol)

def writePedal(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind='major')
    MySymbol.duration = Duration
    MyMeasure.append(MySymbol)
    return(MySymbol)

def writeSharpFive(MyMeasure, RootNote, Duration, Kind):
    MySymbol = harmony.ChordSymbol(root=RootNote, bass=RootNote, kind=Kind)
    MySymbol.duration = Duration
    hd = harmony.ChordStepModification()
    hd.type = 'alter'
    hd.interval = 1
    hd.degree = 5
    MySymbol.addChordStepModification(hd)
    MyMeasure.append(MySymbol)
    return(MySymbol)
