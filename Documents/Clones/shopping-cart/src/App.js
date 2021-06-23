import { useEffect, useState } from "react";
import "./App.css";
import { Button, Card, Navbar, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [list, setList] = useState(null);
  const [shopping, setShopping] = useState([]);
  const [idList, setidList] = useState(0);

  const camelize = (str) => {
    // Lower cases the string
    return (
      str
        .toLowerCase()
        // Uppercases the first character in each group immediately following a space
        // (delimited by spaces)
        .replace(/ (.)/g, function ($0) {
          return $0.toUpperCase();
        })
    );
  };

  const renderBooks = (listID) => {
    switch (listID) {
      case 0:
        return list.map((book) => {
          return (
            <Card key={book.primary_isbn10}>
              <img
                src={book.book_image}
                width={book.book_image_width}
                height={book.book_image_height}
              />
              <Card.Title>{camelize(book.title)}</Card.Title>
              <Card.Text className="description">{book.description}</Card.Text>
              <Button
                variant="primary"
                onClick={() =>
                  setShopping((prev) => [...prev, book])
                }
              >
                Add
              </Button>
            </Card>
          );
        });
        break;
    
      case 1:
        return shopping.map((book) => {
          return (
            <Card key={book.primary_isbn10}>
              <img
                src={book.book_image}
                width={book.book_image_width}
                height={book.book_image_height}
              />
              <Card.Title>{camelize(book.title)}</Card.Title>
              <Card.Text className="description">{book.description}</Card.Text>
              <Button
                variant="danger"
                onClick={() => {console.log(shopping.indexOf(book));shopping.splice(shopping.indexOf(book), 1)}}
              >
                Remove
              </Button>
            </Card>
          );
        });
        break;
    }
  };

  useEffect(() => {
    fetch(
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Qi9xgwcE0YWcCj2DOGny4exLTyKiBTSJ"
    )
      .then((data) => data.json())
      .then((resp) => setList(resp.results.books));
  }, []);

  if (list == null) {
    return (
      <Spinner
        className="ml-auto mr-auto text-center"
        animation="border"
        role="status"
      >
        <span className="sr-only text-dark">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="App">
      <Navbar bg="dark" className="text-light nav-sticky">
        <Button variant="primary" onClick={() => setidList(idList === 0 ? 1 : 0)}>
          <i className="fas fa-shopping-basket"></i>
          <small>{shopping.length}</small>
        </Button>
      </Navbar>
      <h1>{idList == 0 ? "All Books" : "Shopping Cart"}</h1>
      {renderBooks(idList)}
    </div>
  );
}

export default App;
