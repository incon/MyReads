import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  getBooksOnShelf(books, shelf) {
    const filteredBooks = books.filter((book) => book.shelf === shelf)

    if (filteredBooks.length === 0) {
      return (
        <p>No books on this shelf.</p>
      )
    }

    return filteredBooks.map((book) => (
      <li key={book.id}>
        <Book
          updateBook={this.props.updateBook}
          book={book}
        />
      </li>
    ))
  }

  bookShelf(books, shelf, title = "[Title Is Missing]") {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.getBooksOnShelf(books, shelf)}
          </ol>
        </div>
      </div>
    )
  }

  render() {
    const { books } = this.props

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            {this.bookShelf(books, 'currentlyReading', 'Currently Reading')}
            {this.bookShelf(books, 'wantToRead', 'Want to Read')}
            {this.bookShelf(books, 'read', 'Read')}
          </div>
        </div>

        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>

      </div>
    )
  }
}

export default ListBooks