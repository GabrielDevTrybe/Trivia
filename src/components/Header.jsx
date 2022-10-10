import PropTypes from 'prop-types';
import React from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, name } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${email}` } alt="user-avatar" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: MD5(state.login.email).toString(),
});

export default connect(mapStateToProps)(Header);
