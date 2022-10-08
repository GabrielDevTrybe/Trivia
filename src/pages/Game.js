import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { saveQuestionsAction } from '../redux/actions';

class Game extends React.Component {
  state = {
    questionsIndex: 0,
    // answerOptionsIndex: 0,
  };

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const { saveQuestionsDispatch, history } = this.props;
    const token = localStorage.getItem('token');
    const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await resolve.json();
    if (data.response_code === 0) {
      saveQuestionsDispatch(data.results);
    } else {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  handleClick = () => {
    this.setState((prevState) => ({
      questionsIndex: prevState.questionsIndex + 1,
    }));
  };

  answerOptions = (question) => {
    const correctOption = (
      <button
        type="button"
        key={ uuid() }
        data-testid="correct-answer"
        onClick={ this.handleClick }
      >
        {question.correct_answer}
      </button>);
    const incorrectOptions = question.incorrect_answers
      .map((option, index) => (
        <button
          type="button"
          key={ uuid() }
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.handleClick }
        >
          {option}
        </button>
      ));
    return [correctOption, ...incorrectOptions];
  };

  render() {
    const { gameQuestions } = this.props;
    const { questionsIndex } = this.state;
    if (questionsIndex < gameQuestions.length) {
      const answersArray = this.answerOptions(gameQuestions[questionsIndex]);
      const shuffleNumber = 0.5;
      const shuffledArray = answersArray.sort(() => Math.random() - shuffleNumber);
      return (
        <div>
          <h3
            data-testid="question-category"
          >
            {gameQuestions[questionsIndex].category}
          </h3>
          <p data-testid="question-text">{gameQuestions[questionsIndex].question}</p>
          <div data-testid="answer-options">
            {shuffledArray.map((option) => option)}
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
  history: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
