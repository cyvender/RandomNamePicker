import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);
  const [assndNumbers, setAssndNumbers] = useState([]);
  const [namesList, setNamesList] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState("");
  const [clicked, setClicked] = useState(false);
  const [savedList, setSavedList] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();
    let assndNumber = points;
    assndNumber++;
    const data = {
      name: name,
      points: { points: points, assndNumbers: assndNumbers },
    };
    setNamesList([...namesList, data]);
    setName("");
    setPoints(assndNumber);
  };
  const handlePoints = (index) => (e) => {
    const newPoints = e.target.value;
    const updatedNamesList = namesList.map((item, i) =>
      i === index ? { ...item, points: parseInt(newPoints) } : item
    );
    // for (let i = 0; i <= newPoints; i++) {
    //   assndNumbers++;
    //   namesList[index].points.assndNumbers.push(assndNumbers)
    // }
    // setNamesList(updatedNamesList);
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
    const numberMethod = Math.floor(Math.random() * i);
    if (namesList.length > 0) {
      setRandomNumbers(namesList[numberMethod].name);
      setClicked(true);
    } else {
      setRandomNumbers("Sorry, no contestants");
    }
  };
  const handleNewWinnerMethod = () => {
    let i = points;
    let winningNumber = Math.floor(Math.random() * i);
    for (i = 0; i < points; i++) {
      if (namesList[i].points === winningNumber) {
        setRandomNumbers(namesList[i].name);
        break;
      }
    }
  };

  const [random, setRandom] = useState(0);

  function handleRandom() {
    setRandom(Math.random());
  }

  console.log(namesList);
  console.log("random numbers is " + randomNumbers);
  // console.log("names list is " + namesList.map((name) => name.name));
  // console.log(points);
  // console.log(randomNumbers);
  console.log("saved list is " + savedList.map((name) => name.name));

  const test = () => {
    if (namesList.length > 0) {
      return <>The winner is {namesList[randomNumbers].name}!</>;
    }
  };

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
            <input
              value={item.points}
              onChange={handlePoints(index)}
              type="number"
            />
            <button onClick={(e) => handleDelete(index, e)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleWinner}>Winner</button>
      <br></br>
      {namesList.length > 0 && clicked ? (
        <h3>
          And the winner is <br></br>
          <h1 style={{ color: "red" }}>{randomNumbers}!</h1>{" "}
        </h3>
      ) : null}
      <button onClick={handleClearAll}>Clear All</button>
      <br></br>
      <button onClick={handleSaveList}>Save list</button>
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
