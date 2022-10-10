import { GET_ASSERTIONS, GET_SCORE, SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  game: {
    questions: [],
    buttonsOptions: [],
  },
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      game: {
        ...state.game,
        questions: action.payload,
      },
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
