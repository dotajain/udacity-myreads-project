import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getAll, update } from '../common/lib/BooksAPI'
import { camel2title } from '../common/lib/Util'

import MyReads from './MyReads'
import SearchBar from './SearchBar'

import 'react-toastify/dist/ReactToastify.min.css'
import '../assets/stylesheets/App.css'

class BooksApp extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    getAll().then(books => {
      this.setState({ books })
    })
  }

  handleMoveToShelf = (book, shelf) => {
    update(book, shelf).then(() => {
      this.fetchBooks()
      const shelfName = camel2title(shelf) // convert shelf name into title case;
      // show message with Removed when selecting none;
      const toastStr =
        shelf === 'none'
          ? `Removed "${book.title}"!`
          : `Moved "${book.title}" to ${shelfName}!`
      // tooltip style.
      toast(toastStr, {
        className: 'dark-toast',
        progressClassName: 'transparent-progress',
        autoClose: 5000,
      })
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MyReads
              books={books}
              moveToShelf={(book, shelf) => this.handleMoveToShelf(book, shelf)}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBar
              books={books}
              moveToShelf={(book, shelf) => this.handleMoveToShelf(book, shelf)}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
