import React from 'react'
import PropTypes from 'prop-types'

// custom component
import BookList from './BookList'

const BookShelf = props => {
  return (
    <div className="book row">
      {props.books.map((book, idx) => (
        <BookList
          key={idx}
          book={book}
          moveToShelf={shelf => props.moveToShelf(book, shelf)}
        />
      ))}
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array,
  moveToShelf: PropTypes.func,
}

export default BookShelf
