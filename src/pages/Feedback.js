import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const feedbackLimit = 3;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text" className="final">
          {assertions < feedbackLimit ? 'Could be better...' : 'Well Done!'}
        </h2>
        <p data-testid="feedback-total-score" className="final">
          {score}
        </p>
        <p data-testid="feedback-total-question" className="final">
          {assertions}
        </p>
        <div className="playAgain">
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Play Again
            </button>
          </Link>
        </div>
        <div className="rank">
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
