import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">teste</p>
      </div>
    );
  }
}

export default Feedback;
