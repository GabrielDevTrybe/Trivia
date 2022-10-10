import { GET_SCORE, SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  game: {
    questions: [],
    buttonsOptions: [],
  },
  score: 0,
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
  default:
    return state;
  }
};

export default player;
