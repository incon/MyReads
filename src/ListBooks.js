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

  render() {
    const { books } = this.props

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.getBooksOnShelf(books, 'currentlyReading')}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.getBooksOnShelf(books, 'wantToRead')}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.getBooksOnShelf(books, 'read')}
                </ol>
              </div>
            </div>

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