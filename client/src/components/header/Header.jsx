import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  render() {
    return (
      <AppBar title="Jazzercise"
              onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})}>
        <Drawer docked={false}
                width={250}
                open={this.state.drawerOpen}
                onRequestChange={(open) => {
                  this.setState({drawerOpen: open})}
                }>
          <AppBar className="drawerHeader" title="Jazzercise"
                  iconElementLeft={(<div></div>) /* no left element */}/>
          <MenuItem className="drawerItem">Create A New Exercise</MenuItem>
          <MenuItem className="drawerItem">Load an Existing Exercise</MenuItem>
        </Drawer>
      </AppBar>
    );
  }
}
