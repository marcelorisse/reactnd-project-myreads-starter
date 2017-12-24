import './App.css'

import * as BooksAPI from './BooksAPI'

import Bookshelf from './Bookshelf';
import React from 'react'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    shelves: []

  }

  componentDidMount() {

    BooksAPI.getAll().then(books => {
      const shelvesMeta = { 
        currentlyReading: { title: 'Currently reading' },
        wantToRead: { title: 'Want to read' },
        read: { title: 'Read' },
      }
      const shelves = Object.keys(shelvesMeta).map(key => { 
        return { id: key, title: shelvesMeta[key].title, books: books.filter(book => book.shelf === key) }
      })
      this.setState({ shelves })
    });

  }

  moveBook(book, toShelf) {
    BooksAPI.update(book, toShelf).then(updatedShelves => {
      book.shelf = toShelf
      this.setState((prevState) => {
        prevState.shelves = prevState.shelves.map(prevShelf => {
          if (prevShelf.id !== toShelf) prevShelf.books = prevShelf.books.filter(b => updatedShelves[prevShelf.id].indexOf(b.id) >= 0)
          if (prevShelf.id === toShelf) prevShelf.books.push(book)
          return prevShelf
        })
        return prevState
      })
    })
  }

  render() {

    const bookshelves = this.state.shelves

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {bookshelves.map(bookshelf => (
                <Bookshelf
                  key={bookshelf.id}
                  title={bookshelf.title}
                  books={bookshelf.books}
                  onMoveBook={(book, shelf) => this.moveBook(book, shelf)}
                />
              ))}
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }

}

export default BooksApp
