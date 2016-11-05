from music21.note import Note
import argparse


def generateStudy():
    n = Note("D#3")
    n.duration.type = 'half'
    n.show()

if __name__ == '__main__':
    generateStudy()