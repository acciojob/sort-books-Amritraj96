import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setSort } from "../redux/actions";

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, order } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const sortedBooks = [...books].sort((a, b) => {
    const aVal = a[sortBy].toLowerCase();
    const bVal = b[sortBy].toLowerCase();

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* SORT DROPDOWNS */}
      <select
        value={sortBy}
        onChange={(e) => dispatch(setSort(e.target.value, order))}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>

      <select
        value={order}
        onChange={(e) => dispatch(setSort(sortBy, e.target.value))}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* BOOKS TABLE */}
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
          {sortedBooks.map((book) => (
            <tr key={book.primary_isbn13}>
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
