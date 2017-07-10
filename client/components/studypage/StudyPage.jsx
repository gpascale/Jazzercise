import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import MIDI from 'midi.js';

import PageLayout from 'components/pagelayout/PageLayout';
import AbcScore from 'components/abcscore/AbcScore';

require('assets/soundfont/acoustic_grand_piano-ogg.js');


export default class StudyPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      abcText: null,
      selectedTune: null,
      selectedType: 'Guide Tones',
      tunes: [ ]
    };
  }

  render() {
    var self = this;

    var tuneList = this.state.tunes.map((tune, idx) => (
      <MenuItem key={idx} value={tune} primaryText={tune} />
    ));

    var typeList = ['Guide Tones'].map((type, idx) => (
      <MenuItem key={idx} value={type} primaryText={type} />
    ));

    return (
      <PageLayout>
        <div className="studyPage">
          <div className="controls">
            <span className="dropdownLabel tuneDropdownLabel">Tune:</span>
            <DropDownMenu ref="tuneDropdown" value={this.state.selectedTune}
              iconStyle={{fill: 'rgb(140, 140, 140)'}} underlineStyle={{borderTop: '1px solid rgb(140, 140, 140)'}}
              onChange={(event, index, value) =>
                self.setState({selectedTune: value}, self._fetchStudy)
              }>
              {tuneList}
            </DropDownMenu>
            <span className="dropdownLabel typeDropdownLabel">Type:</span>
            <DropDownMenu ref="typeDropdown" value={this.state.selectedType}
              iconStyle={{fill: 'rgb(140, 140, 140)'}} underlineStyle={{borderTop: '1px solid rgb(140, 140, 140)'}}
              onChange={(event, index, value) =>
                self.setState({selectedType: value}, self._fetchStudy)
              }>
              {typeList}
            </DropDownMenu>
            <a href="javascript:void(0);" onClick={this._playMidi}>Play MIDI</a>
          </div>
          <div className={'scoreWrapper ' + (this.state.loading ? 'displayNone' : '')}>
            <AbcScore abcText={this.state.abcText} />
          </div>
          <CircularProgress className={this.state.loading ? '' : 'displayNone'}
            size={100} thickness={10}
            style={{margin: '200px auto'}} />
        </div>
      </PageLayout>
    );
  }

  componentDidMount() {
    var self = this;
    // fetch('/api/tunes').then(result => result.json()).then(({ tunes }) => {
    //   self.setState({
    //     tunes,
    //     selectedTune: tunes[0]
    //   }, self._fetchStudy);
    // }).catch(e => {
    //   console.error('Error fetching /api/tunes');
    // });
    fetch('/api/tunes2').then(result => result.json()).then(({ tunes }) => {
      self.setState({
        tunes,
        selectedTune: 'Tune Up'
      }, self._fetchStudy);
    }).catch(e => {
      console.error('Error fetching /api/tunes');
    });
  }

  _fetchStudy() {
    var self = this;
    var url = '/api/generateStudy2?tune=' + this.state.selectedTune;
    this.setState({ loading: true }, () => {
      fetch(url).then(result => result.json()).then(({ abc, midi }) => {
        self.setState({
          abcText: abc,
          midi: midi,
          loading: false
        });
      });
    });
  }

  _playMidi() {
    MIDI.loadPlugin({ soundfontUrl: './assets/soundfont/', onsuccess: () => {
      const player = MIDI.Player;
      player.loadFile(this.state.midi.lead, () => {
        player.start();
        player.addListener(function(evt) {
          if (evt.message == 144) {
            console.log('NOTE ON: ' + evt.note);
            console.log('TIME: ' + evt.now);
          }
        });
      });
    }});
  }
}