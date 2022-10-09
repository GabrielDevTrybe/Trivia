import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  game: {
    questions: [],
  },
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      game: {
        questions: action.payload,
      },
    };
  default:
    return state;
  }
};

export default questionReducer;
