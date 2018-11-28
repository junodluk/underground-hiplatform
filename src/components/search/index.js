import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { TextField, Button, FontIcon } from 'react-md';

import './styles.scss';

const TRANSITION_TIME = 317; // 300ms for transition and 17 to match up with original CSSTransitionGroup

export class PureSearch extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onSearch: PropTypes.func.isRequired
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      animating: false,
      searching: false
    };
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  animateOpen = (searching) => {
    // const { searching } = this.state;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (!searching) {
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ animating: false });
      }, TRANSITION_TIME);
      this.setState({ animating: true });
    }
  }

  handleShowSearch = () => {
    const { searching } = this.state;
    if (!searching) {
      this.setState({ searching: true });
      this.animateOpen(searching);
    }
  };

  handleHideSearch = () => {
    const { searching } = this.state;
    if (searching) {
      this.setState({ searching: false });
      this.animateOpen(searching);
    }
  }

  handleChange = (value) => {
    this.props.onSearch(value);
    this.setState({ value });
  };

  render() {
    const { animating, value, searching } = this.state;
    const {
      className,
    } = this.props;

    return (
      <div className={cn('search md-grid md-grid--no-spacing', className)}>
        <TextField
          id="spotify-search"
          placeholder="Search"
          className={cn('search__input', {
            'search__input--visible': searching || animating,
            'search__input--active': searching,
          })}
          onChange={this.handleChange}
          leftIcon={<FontIcon>search</FontIcon>}
          onClick={this.handleShowSearch}
          value={value}
        />
        {(searching || animating) && <Button
          key="hide"
          id="documentation-search-hide"
          icon
          onClick={this.handleHideSearch}>
          close
        </Button>}
      </div>
    );
  }
}