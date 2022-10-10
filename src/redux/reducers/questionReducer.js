import { SAVE_OPTIONS, SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  game: {
    questions: [],
    buttonsOptions: [],
  },
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      game: {
        ...state.game,
        questions: action.payload,
      },
    };
  case SAVE_OPTIONS:
    return {
      ...state,
      game: {
        ...state.game,
        buttonsOptions: action.payload,
      },
    };
  default:
    return state;
  }
};

export default questionReducer;
