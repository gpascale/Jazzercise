import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import MIDI from 'midi.js';
import { Dropdown } from 'semantic-ui-react'


import PageLayout from 'components/pagelayout/PageLayout';
import AbcScore from 'components/abcscore/AbcScore';
import BetterSearch from 'components/bettersearch/BetterSearch';

require('assets/soundfont/acoustic_grand_piano-ogg.js');


export default class StudyPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      abcText: null,
      selectedTune: 'All The Things You Are',
      selectedType: 'Guide Tones',
      tunes: [ ]
    };
  }

  render() {
    var self = this;

    const types = [ 'Guide Tones' ];
    const { tunes } = this.state;

    return (
      <PageLayout>
        <div className="studyPage">
          <div className="controls">
            <div className="control">
              <span className="dropdownLabel tuneDropdownLabel">Tune:</span>
              <BetterSearch
                items={tunes ? (tunes.map(tune => ({ title: tune }))) : [ ]}
                onSelected={(tune) => self.setState({ selectedTune: tune }, self._fetchStudy)}
                defaultValue='All The Things You Are'
              />
            </div>
            <div className="control">
              <span className="dropdownLabel typeDropdownLabel">Type:</span>
              <Dropdown placeholder='Study Type' selection
                        options={types.map(type => ({ text: type, value: type }))}
                        defaultValue='Guide Tones'
                        onChange={(e, {value}) => self.setState({selectedType: value}, self._fetchStudy)} />
            </div>
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
    fetch('/api/tunes2').then(result => result.json()).then(({ tunes }) => {
      self.setState({
        tunes
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