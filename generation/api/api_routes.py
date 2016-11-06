from api import app
import flask
from flask import Flask, request, Response
import json

import music21_utils as m21utils
import guidetone_study

def makeJsonResponse(jsonData, isAlreadyStringified=False):
    response = flask.jsonify(result=jsonData)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

def makeErrorResponse(message):
    response = flask.make_response(message, 404)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/api/ping')
def ping():
    return 'pong\n'


@app.route('/api/generateStudy')
def generateStudy():
    study = guidetone_study.generate()
    abc = m21utils.writeToAbc(study)
    return makeJsonResponse(abc)
