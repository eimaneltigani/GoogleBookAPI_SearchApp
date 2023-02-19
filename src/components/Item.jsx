import React from 'react';
import ItemButton from './ItemButton';

export class Item extends React.Component {
    render() {
        const { book } = this.props;

        const imgPlaceholderURL = 'https://via.placeholder.com/150';

        const authorList = getAuthorList(book);
        const smallThumbnail = getSmallThumbnail(book);

        function getAuthorList(book) {
            let authorList = book.volumeInfo && book.volumeInfo.authors;
            let authors = [];

            if(!authorList) {
                return 'N/A';
            }
            authorList.map((author, index) => authors.push(author));

            return authors.join(', ');
        }

        function getSmallThumbnail(book) {
            let smallThumbnailURL =
                book.volumeInfo && 
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.smallThumbnail;

            return smallThumbnailURL ? smallThumbnailURL : imgPlaceholderURL;
        }

        return (
            <li className="border">
                <div className="item-header">
                    <div className="item-subhead">
                        <h3>{book.volumeInfo.title}</h3>
                        <br />
                        Author: {authorList}
                        <br />
                        Publisher: {book.volumeInfo.publisher}
                    </div>
                    <ItemButton book={book} />
                </div>
                <div className="item-description-container">
                    <div className="item-description">
                        <img 
                            src={smallThumbnail}
                            alt={smallThumbnail ? book.volumeInfo.title : 'no-image'}
                        />
                        {book.volumeInfo.description}
                    </div>
                </div>
            </li>
        )
    }
}