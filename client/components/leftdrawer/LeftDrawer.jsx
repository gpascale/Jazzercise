import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import ReactDOM from 'react-dom';

import NewStudy from 'components/newstudy/NewStudy';

class LeftDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modalOpen: false
    };
  }

  render() {
    return (
      <Drawer docked={false}
        width={250}
        open={this.state.open}
        onRequestChange={ (open) => this.setState({open: open}) }>
        <AppBar className="drawerHeader" title="Jazzercise"
          iconElementLeft={(<div></div>) /* no left element */}/>
        <MenuItem className="drawerItem"
          onClick={this._onNewExerciseClick.bind(this)}>
          Create A New Exercise
        </MenuItem>
        <MenuItem className="drawerItem">Load an Existing Exercise</MenuItem>
        <Dialog modal={true}
          open={this.state.modalOpen}
          bodyClassName="newStudyContainer">
          <NewStudy onCancel={ () => this.setState({ modalOpen: false }) }
            onSubmit={ () => this.setState({ modalOpen: false }) }/>
        </Dialog>
      </Drawer>
    );
  }

  open() {
    this.setState({ open: true });
  }

  _onNewExerciseClick() {
    this.setState({
      open: false,
      modalOpen: true
    });
  }
}

export default LeftDrawer;
