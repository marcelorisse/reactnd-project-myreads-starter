import PropTypes from 'prop-types';
import React from 'react';

class Book extends React.Component {

  render() {
    const { title, authors, imageLinks } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join('; ')}</div>
      </div>
    )
  }
  
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string,
    thumbnail: PropTypes.string
  })
}

export default Book