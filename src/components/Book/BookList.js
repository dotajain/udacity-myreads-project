import React from 'react'
import PropTypes from 'prop-types'

// pure function for utilities
import { truncate } from '../../common/lib/Util'

const Book = props => {
  const { moveToShelf, book } = props
  const handleOnChange = ev => {
    // move book to the selected shelf;
    moveToShelf(ev.target.value.trim())
  }
  return (
    <div className="book-list col">
      <div className="book-card">
        <div className="book-card--container">
          <div className="book-card--thumbnail">
            <a href={book.previewLink} target="_blank">
              <img src={book.imageLinks.thumbnail} alt={book.title} />
            </a>
          </div>
          <div className="book-card--body">
            <div className="book-details">
              <h2 className="book-title">
                <a href={book.previewLink} target="_blank">
                  {truncate(book.title, 3)}
                </a>
              </h2>
              <div className="book-author">
                {book.authors && book.authors[0]}
              </div>
              <div className="book-publisher-details">
                {book.publisher && (
                  <span className="book-publisher--name">
                    {book.publisher},
                  </span>
                )}
                <span className="book-publisher--date">
                  {book.publishedDate}
                </span>
                <span className="book-publisher--pages">
                  {book.pageCount} pages
                </span>
              </div>
              <div className="book-description">
                {truncate(book.description, 10, '...')}
              </div>
            </div>
            {book.categories && (
              <div className="book-categories">
                <span>{book.categories[0]}</span>
              </div>
            )}
          </div>
        </div>

        <div className="book-card--footer">
          <div className="book-card--preview">
            <a href={book.previewLink} target="_blank">
              Preview
            </a>
          </div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={handleOnChange}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  moveToShelf: PropTypes.func,
}

export default Book
