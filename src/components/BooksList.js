import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSortCriteria, setSortOrder } from '../redux/actions';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, sortOrder } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Sorting Logic
  const sortedBooks = [...books].sort((a, b) => {
    // Access properties dynamically based on sortBy (title, author, publisher)
    // We map UI values to API keys if necessary. Assuming API keys are 'title', 'author', 'publisher'
    const valA = (a[sortBy] || '').toString().toLowerCase();
    const valB = (b[sortBy] || '').toString().toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="books-container">
      <h1>Book List</h1>
      
      {/* Controls Container: Strict structure for Selectors */}
      <div className="controls">
        {/* select:nth-child(1) -> Sort Criteria */}
        <select 
          value={sortBy} 
          onChange={(e) => dispatch(setSortCriteria(e.target.value))}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        {/* select:nth-child(2) -> Sort Order */}
        <select 
          value={sortOrder} 
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Table Display */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book, index) => (
            // Use ISBN as key if available, otherwise index
            <tr key={book.primary_isbn13 || index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
