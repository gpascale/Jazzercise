import json
import os
import sys
import sqlite3

import music21_utils as m21utils
import guidetone_study_greg as guidetone_study
import guidetone_study_new

if __name__ == "__main__":
    try:
        tuneName = sys.argv[1]
    except IndexError as e:
        print('Error: A valid tune is required\n')
        print('\nUsage: generate-study.py <tune>\n\n')
        sys.exit()

    print('generating study for tune', tuneName)

    # Fetch the tune from the database
    try:
        db_conn = sqlite3.connect('../db/songs.db', check_same_thread=False)
        c = db_conn.cursor()
        c.execute('SELECT title, key, measures FROM songs WHERE title=?', (tuneName,))
        [tune] = c.fetchall()
        c.close()
    except ValueError as e:
        print('No such tune:', tuneName)
        sys.exit()

    # Generate the study
    study = guidetone_study_new.generate(tune)

    # Write out the notation
    abc = m21utils.writeToAbc(study)

    # Print the final result
    result = json.dumps({ 'abc': abc })
    print(result)

    # # Generate MIDI for the accompaniment
    # accompaniment = deepcopy(study)
    # measures = accompaniment.parts[0].getElementsByClass("Measure")
    # for measure in measures:
    #     measure.removeByClass('Note')
    # accompanimentMidi = m21utils.writeToMidi(accompaniment)
    # # ...and lead
    # lead = deepcopy(study)
    # measures = lead.parts[0].getElementsByClass("Measure")
    # for measure in measures:
    #     measure.removeByClass('ChordSymbol')
    # leadMidi = m21utils.writeToMidi(lead)

    # return makeJsonResponse({ 'abc': abc, 'midi': { 'accompaniment': accompanimentMidi, 'lead': leadMidi } })