import PropTypes from 'prop-types';
import React from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header className="informaçao">
        <img
          className="foto"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${email}` }
          alt="user-avatar"
        />
        <h3
          className="jogador"
          data-testid="header-player-name"
        >
          {name}
        </h3>
        <p
          className="pontos"
          data-testid="header-score"
        >
          {score}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: MD5(state.login.email).toString(),
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
