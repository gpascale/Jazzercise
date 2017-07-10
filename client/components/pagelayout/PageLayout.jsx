import React from 'react';
import Header from 'components/header/Header';

export default class PageLayout extends React.Component {

  render() {
    return (
      <div className="container">
        <Header />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
