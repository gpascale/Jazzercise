import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';

export default class BetterSearch extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.array.isRequired,
    onSelected: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: [ ],
    }
  }

  render() {
    const self = this;
    const { data, loading, results } = this.state;
    const { name, onSelected, items, ...passThruProps } = this.props;
    return (
      <Search className="betterSearch"
        loading={loading}
        onResultSelect={ (e, {result}) => this.props.onSelected(result.title) }
        onSearchChange={ (e, {value}) => self._filter(value) }
        results={results}
        {...passThruProps}
      />
    );
  }

  _filter(text) {
    this.setState({
      results: this.props.items.filter(({title}) => {
        return title.toLowerCase().startsWith(text.toLowerCase());
      }).slice(0, 15)
    })
  }
}