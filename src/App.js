import { useEffect, useState } from "react";

const URL = "http://api.open-notify.org/astros.json";

function App() {
  const [number, setNumber] = useState(0);
  const [people, setPeople] = useState([]);
  const [activeCraft, setActiveCraft] = useState("All");

  useEffect(() => {
    async function fetchNumber() {
      const response = await fetch(URL);
      const data = await response.json();

      setNumber(data["number"]);
      setPeople(data["people"]);
    }
    fetchNumber();
  }, []);

  function clickHandler(event) {
    setActiveCraft(event.target.name);
  }

  const filteredPeople =
    activeCraft === "All"
      ? people
      : people.filter((person) => person.craft === activeCraft);

  return (
    <div className="App">
      <div className="container">
        <h1>People currently in space: {number}</h1>
        <ul>
          {filteredPeople.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>

        <div className="button-container">
          <button onClick={clickHandler} name="All">
            All
          </button>
          <button onClick={clickHandler} name="ISS">
            ISS
          </button>
          <button onClick={clickHandler} name="Tiangong">
            Tiangong
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
