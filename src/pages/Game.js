import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { saveQuestionsAction } from '../redux/actions';

class Game extends React.Component {
  state = {
    questionsIndex: 0,
    revealOptions: false,
    disabledButton: false,
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
      revealOptions: true,
      questionsIndex: prevState.questionsIndex + 1,
    }));
  };

  answerOptions = (question) => {
    const { revealOptions, disabledButton } = this.state;
    const correctOption = (
      <button
        type="button"
        key={ uuid() }
        data-testid="correct-answer"
        onClick={ this.handleClick }
        style={ {
          border: revealOptions ? '3px solid rgb(6, 240, 15)' : '',
        } }
        disabled={ disabledButton }
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
          style={ {
            border: revealOptions ? '3px solid red' : '',
          } }
          disabled={ disabledButton }
        >
          {option}
        </button>
      ));
    return [correctOption, ...incorrectOptions];
  };

  render() {
    const { gameQuestions } = this.props;
    const { questionsIndex } = this.state;
    const questionTimer = 30000;
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
          {setTimeout(() => {
            this.setState({
              revealOptions: true,
              disabledButton: true,
            });
          }, questionTimer)}
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
