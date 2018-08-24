import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// custom component
import BookShelf from '../Book/BookShelf'

// lib functions for api call
import { search } from '../../common/lib/BooksAPI'

class SearchBar extends Component {
  state = {
    results: [],
  }

  // call function on search value change;
  handleSearch = ev => {
    const { books } = this.props
    const query = ev.target.value.trim()
    // check if search value
    if (query) {
      // search 80 books
      search(query, 80).then(results => {
        if (results.length > 0) {
          results = results.filter(res => res.imageLinks)
          results = results.map(res => {
            const idx = books.findIndex(book => book.id === res.id)
            res['shelf'] = idx === -1 ? 'none' : books[idx].shelf
            return res
          })
          this.setState({ results })
        }
      })
    }
  }

  render() {
    const { results } = this.state
    const { moveToShelf } = this.props
    return (
      <div className="search-books">
        <ToastContainer
          toastClassName="dark-toast"
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              ref={input => input && input.focus()}
              placeholder="Search by title or author"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {results.length > 0 && (
            <BookShelf
              books={results}
              moveToShelf={(book, shelf) => moveToShelf(book, shelf)}
            />
          )}
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  books: PropTypes.array,
  moveToShelf: PropTypes.func,
}

export default SearchBar
