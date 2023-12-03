import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [namesList, setNamesList] = useState([]);
  const [winner, setWinner] = useState("");
  const [clicked, setClicked] = useState(false);
  const [savedList, setSavedList] = useState([]);
  const [noContestants, setNoContestants] = useState("");

  const handleInput = (e) => {
    e.preventDefault();

    const data = {
      name: name,
    };
    setNamesList([...namesList, data]);
    setName("");
  };
  function handleDelete(index) {
    const updatedNamesList = [
      ...namesList.slice(0, index),
      ...namesList.slice(index + 1),
    ];
    setNamesList(updatedNamesList);
  }

  const handleWinner = () => {
    let i = namesList.length;
    const winningNumber = Math.floor(Math.random() * i);
    if (namesList.length > 0) {
      setWinner(namesList[winningNumber].name);
      setClicked(true);
    }
    setNoContestants("Sorry, no contestants");
  };

  console.log(namesList);
  console.log("random numbers is " + winner);
  // console.log("names list is " + namesList.map((name) => name.name));
  // console.log(points);
  // console.log(randomNumbers);
  console.log(clicked);
  console.log("saved list is " + savedList.map((name) => name.name));

  const handleSaveList = () => {
    setSavedList((prevList) => {
      let namesListCopy = [...namesList];
      return namesListCopy;
    });
  };
  const handleUseSavedList = () => {
    setNamesList((prevList) => {
      let useSavedList = savedList;
      return useSavedList;
    });
  };

  const handleClearAll = () => {
    setNamesList((prevList) => {
      let useNewNamesList = [];
      return useNewNamesList;
    });
    setClicked(false);
    setNoContestants("");
  };

  return (
    <div className="App">
      <h1>Random Name Picker</h1>
      Name:
      <input
        value={name}
        // style={{ textTransform: "capitalize" }}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleInput}>Enter</button>
      <ul>
        {namesList.map((item, index) => (
          <li key={index}>
            {item.name}
            <button onClick={(e) => handleDelete(index, e)}>Delete</button>
          </li>
        ))}
      </ul>
      {namesList.length > 0 && clicked ? (
        <h3>
          And the winner is <br></br>
          <h1 style={{ color: "red" }}>{winner}!</h1>{" "}
        </h3>
      ) : null}
      {!(namesList.length > 0) && <h3>{noContestants}</h3>}
      <button onClick={handleWinner}>Winner</button>
      <br></br>
      <button onClick={handleClearAll}>Clear All</button>
      <br></br>
      <button onClick={handleSaveList}>Save List</button>
      <button onClick={handleUseSavedList}>Use Saved List</button>
    </div>
  );
}

export default App;

//another method of picking random number bet specific numbers

//  const handleWinner = () => {
//      while (true) {
//     let winningNumber = (Math.floor(Math.random()*10));
//     if (winningNumber <= namesList.length) {
//       setRandomNumbers(winningNumber);
//       break;
//     }
//      }
//  }
