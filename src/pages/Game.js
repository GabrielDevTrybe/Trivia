import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { saveQuestionsAction, getScore, getAssertions } from '../redux/actions';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    questionsIndex: 0,
    revealOptions: false,
    disabledButton: false,
    buttonNext: false,
    countdown: 30,
    intervalId: '',
    assertions: 0,
    gameQuestions: [],
    shuffledOptions: [],
  };

  componentDidMount() {
    this.fetchAPI();

    const intervalCountdown = 1000;
    const interval = setInterval(() => {
      this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }));
    }, intervalCountdown);
    this.setState({ intervalId: interval });
  }

  componentDidUpdate() {
    const questionTimer = 30000;
    setTimeout(() => {
      this.setState({
        revealOptions: true,
        disabledButton: true,
      });
    }, questionTimer);

    const { countdown, intervalId } = this.state;
    if (countdown === 0) {
      clearInterval(intervalId);
    }
  }

  fetchAPI = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await resolve.json();
    if (data.response_code === 0) {
      this.setState({
        gameQuestions: data.results,
      }, () => {
        const { gameQuestions, questionsIndex } = this.state;
        console.log(gameQuestions);
        const answersArray = this.answerOptions(gameQuestions[questionsIndex]);
        const shuffleNumber = 0.5;
        const shuffledOptions = answersArray.sort(() => Math.random() - shuffleNumber);
        this.setState({
          shuffledOptions,
        }, () => console.log(shuffledOptions));
      });
      // saveQuestionsDispatch(data.results);
    } else {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  handleScore = (correct) => {
    const { countdown, questionsIndex, gameQuestions } = this.state;
    const { score } = this.props;

    const { difficulty } = gameQuestions[questionsIndex];
    const defaultPoints = 10;
    const hardPoints = 3;

    if (correct === 'correct-answer') {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }));
      switch (difficulty) {
      case 'easy':
        return score + defaultPoints + (countdown * 1);
      case 'medium':
        return score + defaultPoints + (countdown * 2);
      case 'hard':
        return score + defaultPoints + (countdown * hardPoints);
      default:
        return score;
      }
    } else {
      return score;
    }
  };

  handleAnswerClick = (correct) => {
    const { getScoreDispatch } = this.props;

    const newScore = this.handleScore(correct);
    getScoreDispatch(newScore);

    this.setState({
      revealOptions: true,
      buttonNext: true,
      disabledButton: true,
    });
  };

  answerOptions = (question) => [question.correct_answer, ...question.incorrect_answers];
  // const { revealOptions, disabledButton } = this.state;
  // const correctOption = (
  // <button
  //   type="button"
  //   key={ uuid() }
  //   data-testid="correct-answer"
  //   onClick={ () => this.handleAnswerClick('correct-answer') }
  //   style={ {
  //     border: revealOptions ? '3px solid rgb(6, 240, 15)' : '',
  //   } }
  //   disabled={ disabledButton }
  // >
  //   {question.correct_answer}
  // </button>);
  // const incorrectOptions = question.incorrect_answers
  //   .map((option, index) => (
  // <button
  //   type="button"
  //   key={ uuid() }
  //   data-testid={ `wrong-answer-${index}` }
  //   onClick={ this.handleAnswerClick }
  //   style={ {
  //     border: revealOptions ? '3px solid red' : '',
  //   } }
  //   disabled={ disabledButton }
  // >
  //   {option}
  // </button>
  //   ));
  // return [correctOption, ...incorrectOptions];

  handleNextQuestion = () => {
    const { questionsIndex, assertions } = this.state;
    // se não der certo, testar com let, em vez de const
    const { history, getAssertionsDispatch } = this.props;
    const lastQuestionIndex = 4;
    if (questionsIndex < lastQuestionIndex) {
      this.setState((prevState) => ({
        questionsIndex: prevState.questionsIndex + 1,
        disabledButton: false,
      }));
      const { questionsIndex, gameQuestions } = this.state;
      const answersArray = this.answerOptions(gameQuestions[questionsIndex]);
      const shuffleNumber = 0.5;
      const shuffledOptions = answersArray.sort(() => Math.random() - shuffleNumber);
      this.setState({
        shuffledOptions,
      }, () => console.log(shuffledOptions));
    } else {
      this.setState({
        revealOptions: false,
        buttonNext: false,
      });
      getAssertionsDispatch(assertions);
      history.push('/feedback');
    }
  };

  handleIndexIncorrect = (index) => {
    index += 1;
    return index;
  };

  render() {
    // const { gameQuestions } = this.props;
    const { questionsIndex, buttonNext, countdown,
      shuffledOptions, revealOptions, gameQuestions, disabledButton } = this.state;
    if (questionsIndex < gameQuestions.length) {
      const index = -1;
      // const answersArray = this.answerOptions(gameQuestions[questionsIndex]);
      // const shuffleNumber = 0.5;
      // const shuffledArray = answersArray.sort(() => Math.random() - shuffleNumber);
      return (
        <div>
          <Header />
          <h3
            data-testid="question-category"
          >
            {gameQuestions[questionsIndex].category}
          </h3>
          <p data-testid="question-text">{gameQuestions[questionsIndex].question}</p>
          <div data-testid="answer-options">
            {shuffledOptions.map((option) => {
              if (option === gameQuestions[questionsIndex].correct_answer) {
                return (
                  <button
                    type="button"
                    key={ uuid() }
                    data-testid="correct-answer"
                    onClick={ () => this.handleAnswerClick('correct-answer') }
                    style={ {
                      border: revealOptions ? '3px solid rgb(6, 240, 15)' : '',
                    } }
                    disabled={ disabledButton }
                  >
                    {option}
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  key={ uuid() }
                  data-testid={ `wrong-answer-${this.handleIndexIncorrect(index)}` }
                  onClick={ this.handleAnswerClick }
                  style={ {
                    border: revealOptions ? '3px solid red' : '',
                  } }
                  disabled={ disabledButton }
                >
                  {option}
                </button>
              );
            })}
          </div>
          {buttonNext && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextQuestion }
            >
              Next
            </button>)}
          {countdown}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  // gameQuestions: state.player.game.questions,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  // saveQuestionsDispatch: (data) => dispatch(saveQuestionsAction(data)),
  getScoreDispatch: (score) => dispatch(getScore(score)),
  getAssertionsDispatch: (assertions) => dispatch(getAssertions(assertions)),
});

Game.propTypes = {
  gameQuestions: PropTypes.array,
  history: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
