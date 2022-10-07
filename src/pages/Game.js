import React from 'react';

class Home extends React.Component {
  state = {
    token: '',
  };

  componentDidMount() {
    const getToken = localStorage.getItem('token');
    this.setState({
      token: getToken,
    });
  }

  render() {
    const { token } = this.state;
    console.log(token);
    return (
      <div>Pagina incial do jogo</div>
    );
  }
}
export default Home;
