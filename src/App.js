import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBook = (book, shelf) => {

    book.shelf = shelf

    if (this.state.books.filter((b) => b.id === book.id).length > 0) {
      this.setState((state) => ({
        books: state.books.map((b) => {
          if (b.id === book.id) {
            b = book
          }
          return b
        })
      }))
    } else {
      this.setState((state) => ({
        books: state.books.concat([book])
      }))
    }

    BooksAPI.update(book, shelf)

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
