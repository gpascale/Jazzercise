from api import app
import flask
from flask import Flask, request, Response
import json
import glob
import os
from copy import deepcopy

import music21_utils as m21utils
import guidetone_study_greg as guidetone_study

def makeJsonResponse(jsonData, isAlreadyStringified=False):
    response = flask.jsonify(jsonData)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Content-Type'] = 'application/json'
    return response

def makeErrorResponse(message):
    response = flask.make_response(message, 404)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/api/ping')
def ping():
    return 'pong\n'


@app.route('/api/tunes')
def listTunes():
    tuneFiles = glob.glob('../musicxml/*.xml')
    tunes = [ os.path.basename(x).replace('.xml', '') for x in tuneFiles ]
    return makeJsonResponse({ 'tunes': tunes })


@app.route('/api/generateStudy')
def generateStudy():
    tune = request.args['tune']
    study = guidetone_study.generate(tune)

    # Write out the notation
    abc = m21utils.writeToAbc(study)

    # Generate MIDI for the accompaniment
    accompaniment = deepcopy(study)
    measures = accompaniment.parts[0].getElementsByClass("Measure")
    for measure in measures:
        measure.removeByClass('Note')
    accompanimentMidi = m21utils.writeToMidi(accompaniment)
    # ...and lead
    lead = deepcopy(study)
    measures = lead.parts[0].getElementsByClass("Measure")
    for measure in measures:
        measure.removeByClass('ChordSymbol')
    leadMidi = m21utils.writeToMidi(lead)

    return makeJsonResponse({ 'abc': abc, 'midi': { 'accompaniment': accompanimentMidi, 'lead': leadMidi } })
