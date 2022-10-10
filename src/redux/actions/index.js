export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const GET_REQUEST = 'GET_REQUEST';
export const GET_SCORE = 'GET_SCORE';
export const LOGIN = 'LOGIN';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

export const saveQuestionsAction = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const responseApi = (payload) => ({
  type: GET_API,
  payload,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const getAssertions = (payload) => ({
  type: GET_ASSERTIONS,
  payload,
});

export function getRequest() {
  return async (dispath) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const request = await response.json();
      dispath(responseApi(request));
    } catch (e) {
      throw new Error(e);
    }
  };
}
