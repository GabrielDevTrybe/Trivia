import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { saveQuestionsAction } from '../redux/actions';

class Game extends React.Component {
  state = {
    questionsIndex: 0,
  };

  componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (token === {
      response_code: 3,
      results: [],
    }) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.fetchAPI(token);
    }
  }

  fetchAPI = async (token) => {
    const { saveQuestionsDispatch } = this.props;
    const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await resolve.json();
    saveQuestionsDispatch(data);
  };

  handleClick = () => {
    this.setState((prevState) => ({
      questionsIndex: prevState.questionsIndex + 1,
    }));
  };

  render() {
    const { gameQuestions } = this.props;
    const { questionsIndex } = this.state;
    if (questionsIndex < gameQuestions.length) {
      return (
        <div>
          <h3
            data-testid="question-category"
          >
            {gameQuestions[questionsIndex].category}
          </h3>
          <p data-testid="question-text">{gameQuestions[questionsIndex].question}</p>
          <div>
            <button
              type="button"
              data-testid="correct-answer"
              onClick={ this.handleClick }
            >
              {gameQuestions[i].correct_answer}
            </button>
            {gameQuestions[i].incorrect_answers.map((answer, index) => (
              <button
                type="button"
                key={ uuid() }
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleClick }
              >
                {answer}
              </button>))}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  gameQuestions: state.questionReducer.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestionsDispatch: (data) => dispatch(saveQuestionsAction(data)),
});

Game.propTypes = {
  gameQuestions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
