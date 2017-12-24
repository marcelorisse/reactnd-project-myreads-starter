import * as BooksAPI from '../BooksAPI'

import Book from './Book'
import { DebounceInput } from 'react-debounce-input'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

class Search extends React.Component {

  state = {
    term: '',
    books: []
  }

  search = (term) => {
    if (term.length > 0) {
      BooksAPI.search(term).then(books => this.setState({ term, books }))
    } else {
      this.setState({ term, books: [] })
    }
  }

  render() {
    const { term, books } = this.state
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              placeholder="Search by title or author"
              minLength={2}
              debounceTimeout={300}
              onChange={event => this.search(event.target.value)} />
          </div>
        </div>
        {books.length > 0 ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {books.map(book => (
                <li key={book.id} >
                  <Book book={book} onMoveBook={this.props.onMoveBook} />
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="search-books-results">
            {term && (
              <p className="books-grid">
                No books were found by "{term}" term. Check the set of search&nbsp;
                <a target="_blank" href="https://github.com/marcelorisse/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md">terms</a>.
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

}

Search.propTypes = {
  onMoveBook: PropTypes.func.isRequired,
}

export default Search