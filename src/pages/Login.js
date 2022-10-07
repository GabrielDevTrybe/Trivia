import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    email: '',
    name: '',
    btnDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.handleValidate());
  };

  handleValidate = () => {
    const { email, name } = this.state;
    if (name && email) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  fetchToken = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const request = await response.json();
    localStorage.setItem('token', request.token);
    history.push('/game');
  };

  render() {
    const { btnDisable, email, name } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ btnDisable }
          onClick={ this.fetchToken }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;
