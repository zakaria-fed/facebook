import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Section from "./Section";

function App() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [isFound, setIsFound] = useState(false);
  // Create an array that will hold indexes of items contain the word
  const found = [];

  const submitted = () => {
    // Create a loop that will search in every item
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].source.toLowerCase().includes(search) ||
        data[i].section.toLowerCase().includes(search) ||
        data[i].subsection.toLowerCase().includes(search) ||
        data[i].title.toLowerCase().includes(search) ||
        data[i].abstract.toLowerCase().includes(search)
      ) {
        found.push(data[i]);
      }
    }

    if (found.length <= 0) {
      console.log(found);
      setIsFound(false);
      return alert("No Item Found");
    } else {
      console.log(found);
      setIsFound(true);
    }
  };

  useEffect(() => {
    fetch(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=aydLbmMda9cWDrdVWhtTx8xSSWVVAVoi"
    )
      .then((resp) => resp.json())
      .then((data) => setData(data.results));
  }, []);
  
  return (
    <div className="App">
      <label htmlFor="search">Search</label> <br />
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="button"
        onClick={submitted}
        className="btn btn-primary btn-lg btn-block"
      >
        Submit
      </button>

      <Section data={found} />
    </div>
  );
}

export default App;
