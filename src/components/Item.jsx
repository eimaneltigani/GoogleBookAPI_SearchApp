import React from 'react';
import ItemButton from './ItemButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
            <Row className="justify-content-center mb-0">
                <Col md="12" xl="10">
                <Card className="shadow-0 border rounded-3 mt-5 mb-3">
                    <Card.Body>
                        <Row>
                            <Col md="12" lg="3" className="mb-4 mb-lg-0">
                            <Card.Img
                                src={smallThumbnail}
                                alt={smallThumbnail ? book.volumeInfo.title : 'no-image'}
                                // fluid
                                className="w-100"
                            />
                            </Col>
                            <Col md="8">
                                <Card.Title>{book.volumeInfo.title}</Card.Title>
                                <div className="mt-1 mb-0 text-muted small">
                                    <h6>By {authorList}</h6>
                                    <h6>Published by {book.volumeInfo.publisher}</h6>
                                </div>
                                <p>
                                    {book.volumeInfo.description.slice(0,500)}...
                                </p>
                                <ItemButton book={book} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        )
    }
}