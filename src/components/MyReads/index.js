import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// custom component
import BookShelf from '../Book/BookShelf'

// icons
import LoadingSpinner from '../../common/components/icons/LoadingSpinner'
import IconAdd from '../../common/components/icons/IconAdd'

class MyReads extends Component {
  state = {
    curShelf: 'currentlyReading',
    isLoading: true,
  }

  componentDidMount() {
    // show loading spinner for 500 ms.
    setTimeout(() => this.setState({ isLoading: false }), 500)
  }

  chooseShelf = ev => {
    // update state with current self
    this.setState({ curShelf: ev.target.value })
  }

  isActiveShelf = name => {
    // check active current shelf and add active class
    return name === this.state.curShelf ? 'active' : ''
  }

  renderBookShelf = books => {
    // get selected shelf books and render
    const _books = books.filter(book => book.shelf === this.state.curShelf)
    return (
      <BookShelf
        books={_books}
        moveToShelf={(book, shelf) => this.props.moveToShelf(book, shelf)}
      />
    )
  }

  renderLoading = () => {
    // render loading spinner
    return (
      <div className="loading">
        <LoadingSpinner />
        Loading...
      </div>
    )
  }

  render() {
    const { isLoading } = this.state
    const { books } = this.props
    return (
      <div className="my-read">
        <ToastContainer
          toastClassName="dark-toast"
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <header className="app-header">
          <h1 className="app-title">My Reads</h1>
        </header>
        <main className="main">
          <div className="container">
            <h2 className="main-title">Currently Reading</h2>
            {isLoading ? this.renderLoading() : this.renderBookShelf(books)}
            <footer>
              <button
                className={this.isActiveShelf('currentlyReading')}
                onClick={this.chooseShelf}
                value="currentlyReading"
              >
                Currently Reading
              </button>
              <button
                className={this.isActiveShelf('wantToRead')}
                onClick={this.chooseShelf}
                value="wantToRead"
              >
                Want To Read
              </button>
              <button
                className={this.isActiveShelf('read')}
                onClick={this.chooseShelf}
                value="read"
              >
                Read
              </button>
            </footer>
            <div className="app-search">
              <Link className="app-search--button" to="/search">
                <IconAdd />
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

MyReads.propTypes = {
  books: PropTypes.array,
  moveToShelf: PropTypes.func,
}

export default MyReads
