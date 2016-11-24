import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import _ from 'underscore';

import common from 'src/js/common';

const logoPng = require('assets/images/guide_tone_study_logo.png');

function _autocompleteMatcher(searchText, key) {
  if (!searchText)
    return true;
  if (!key)
    return false;

  searchText = searchText.toLowerCase();
  key = key.toLowerCase();
  return key.indexOf(searchText) !== -1;
}

class NewStudy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tunes: [ ],
      studyTypes: [ ],
      selectedStudyTypeIdx: -1
    };
  }

  render() {
    const actions = [
      <FlatButton key="Cancel"
                  label="Cancel"
                  primary={true}
                  onTouchTap={this.props.onCancel}/>,
      <FlatButton key="Submit"
                  label="Submit"
                  primary={true}
                  disabled={true}
                  onTouchTap={this.props.onSubmit}/>,
    ];

    const studyTypes = [
      { title: "Guide Tones" },
      { title: "Arpeggios" },
      { title: "Chord Tone Workout" },
      { title: "Scales" },
    ];

    return (
      <div className="newStudy">
        <h1>Create a new Exercise</h1>
        <p className="newStudyLabel">
          Pick a Tune
        </p>
        <AutoComplete hintText="e.g. Autumn Leaves, Just Friends..."
                      dataSource={this.state.tunes}
                      openOnFocus={true}
                      listStyle={{maxHeight: 240}}
                      onUpdateInput={() => 0}
                      filter={_autocompleteMatcher}/> 
        <p className="newStudyLabel">
          Pick an Exercise Type...
        </p>
        <GridList className="studyTypeGrid" 
                  style={{ width: 500, height: 450, overflowY: 'auto' }}>
          {_.map(studyTypes, (study, idx) => (
            <GridTile className={"studyTypeTile" + (this.state.selectedStudyTypeIdx == idx ?
                                                    " active" : "")}
                      key={idx}
                      title={study.title}
                      subtitle={<span>study.subtitle</span>}
                      actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                      onTouchTap={this._onSelectStudyType.bind(this, idx)}>
              {<img src={logoPng} />}
            </GridTile>
          ))}
        </GridList>
        <div className="controls">
          {actions}
        </div>
      </div>
    );
  }

  componentDidMount() {
    common.GETJSON(common.apiRoot + '/tunes', (res) => 
      this.setState({ tunes: res.tunes })
    );
  }

  _onSelectStudyType(idx) {
    this.setState({
      selectedStudyTypeIdx: idx
    });
  }

}

export default NewStudy;
