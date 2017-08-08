import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    bookResults: [],
    searchQueue: []
  }

  updateTerm = (term, useQueue = false) => {
    // Max results
    const maxResults = 20

    // Manage queue
    if (this.state.searchQueue.length > 1) {
      if (useQueue) {
        term = this.state.searchQueue.pop()
        this.setState({searchQueue: []})
      } else {
        this.setState((state) => ({
          searchQueue: state.searchQueue.concat([term])
        }))
        // Work already in process return early
        return false
      }
    }

    // Has term?
    if (!term) {
      this.setState({bookResults: []})
      return false
    }

    // Start Queue
    this.setState((state) => ({
      searchQueue: state.searchQueue.concat([term])
    }))

    BooksAPI.search(term, maxResults).then((results) => {
        if (Array.isArray(results)) {
          const bookResults = results.map((bookFromResult) => {

            // Default to not already being on the shelf
            bookFromResult.shelf = 'none'

            // If already on the shelf update to match
            let match = this.props.books.filter(book => book.id === bookFromResult.id)
            if (match.length === 1) {
              bookFromResult.shelf = match.shelf
            }

            return bookFromResult

          })

          this.setState({bookResults})

        } else {
          this.setState({bookResults: []})
        }

        // Run as queue if needed
        if (this.state.searchQueue.length <= 1) {
          this.setState({searchQueue: []})
        } else {
          this.updateTerm('', true)
        }
      }
    )
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateTerm(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.bookResults && (
              this.state.bookResults.map((book) => (
                <li key={book.id}>
                  <Book
                    updateBook={this.props.updateBook}
                    book={book}
                  />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks