import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

class LeftDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
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
        <MenuItem className="drawerItem">Create A New Exercise</MenuItem>
        <MenuItem className="drawerItem">Load an Existing Exercise</MenuItem>
      </Drawer>
    );
  }

  open() {
    this.setState({ open: true });
  }
}

export default LeftDrawer;
