import './App.css'

import * as BooksAPI from './BooksAPI'

import Bookshelf from './Components/Bookshelf'
import { Link } from 'react-router-dom'
import React from 'react'
import { Route } from 'react-router-dom'
import Search from './Components/Search';

class BooksApp extends React.Component {
  state = {
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
        <Route exact path='/' render={() => (
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
              <Link
                to='/search'
              >Add a book</Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={() => (
          <Search
            onMoveBook={(book, shelf) => this.moveBook(book, shelf)}
          />
        )} />
      </div>
    )
  }

}

export default BooksApp
