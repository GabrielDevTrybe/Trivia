export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const GET_REQUEST = 'GET_REQUEST';

export const saveQuestionsAction = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const responseApi = (payload) => ({
  type: GET_API,
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
