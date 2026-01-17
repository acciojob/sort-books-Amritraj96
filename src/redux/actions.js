import axios from 'axios';

// Action Types
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORT_CRITERIA = 'SET_SORT_CRITERIA';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

// API Endpoint (Using a placeholder or NYT endpoint)
// Note: In a real scenario, you need an API Key for NYT. 
// For this test, ensure the URL matches your mock server or specific requirement.
const API_URL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY_HERE";

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    try {
      // If you don't have a valid API Key, replace the axios call with mock data for testing
      const response = await axios.get(API_URL);
      
      // Adjust 'results.books' based on actual API response structure
      const books = response.data.results.books; 
      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
    }
  };
};

export const setSortCriteria = (criteria) => ({
  type: SET_SORT_CRITERIA,
  payload: criteria,
});

export const setSortOrder = (order) => ({
  type: SET_SORT_ORDER,
  payload: order,
});
