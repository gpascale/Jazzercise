import React from 'react';
import AppBar from 'material-ui/AppBar';

import LeftDrawer from '../leftdrawer/LeftDrawer';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar title="Jazzercise"
              onLeftIconButtonTouchTap={() => this.refs.drawer.open()}>
        <LeftDrawer ref="drawer"/>
      </AppBar>
    );
  }
}
