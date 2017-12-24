import Book from './Book';
import PropTypes from 'prop-types';
import React from 'react';

class Bookshelf extends React.Component {

  render() {
    const { title, books } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id} >
                <Book title={book.title} authors={book.authors} imageLinks={book.imageLinks} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
}

export default Bookshelf