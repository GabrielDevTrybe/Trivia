import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const feedbackLimit = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions < feedbackLimit ? 'Could be better...' : 'Well Done!'}
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
