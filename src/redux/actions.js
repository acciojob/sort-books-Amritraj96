export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";
export const SET_SORT = "SET_SORT";

export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });

  try {
    const res = await fetch(
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY"
    );
    const data = await res.json();

    dispatch({
      type: FETCH_BOOKS_SUCCESS,
      payload: data.results.books,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BOOKS_FAILURE,
      payload: error.message,
    });
  }
};

export const setSort = (sortBy, order) => ({
  type: SET_SORT,
  payload: { sortBy, order },
});
