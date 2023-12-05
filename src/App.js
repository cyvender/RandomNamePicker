import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(1);
  const [namesList, setNamesList] = useState([]);
  const [winner, setWinner] = useState("");
  const [clicked, setClicked] = useState(false);
  const [savedList, setSavedList] = useState([]);
  const [noContestants, setNoContestants] = useState("");

  const handleInput = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      weight: weight,
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
    if (!namesList.length > 0) {
      setClicked(false);
    } else {
      setClicked(true);
    }

    setNoContestants("Sorry, no contestants");

    const cumulativeWeights = [];

    for (let i = 0; i < namesList.length; i += 1) {
      cumulativeWeights[i] =
        namesList[i].weight + (cumulativeWeights[i - 1] || 0);
    }
    console.log("cumulativeWeights: " + cumulativeWeights);

    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    console.log("maxCumulativeWeights: " + maxCumulativeWeight);
    const winningNumber = Math.random() * maxCumulativeWeight;
    console.log("winningNumber: " + winningNumber);
    for (
      let namesListIndex = 0;
      namesListIndex < namesList.length;
      namesListIndex += 1
    ) {
      if (cumulativeWeights[namesListIndex] >= winningNumber) {
        setWinner(namesList[namesListIndex].name);
        return;
      }
    }
  };

  console.log(namesList);
  console.log("winner " + winner);
  // console.log("names list is " + namesList.map((name) => name.name));
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
  const handleWeight = (e, index) => {
    const { value } = e.target;
    const newWeight = parseFloat(value);
    setNamesList((prevData) => {
      return prevData.map((item, i) =>
        i === index ? { ...item, weight: newWeight } : item
      );
    });
  };
  return (
    <div className="App">
      <h1>Random Name Picker</h1>
      Name:<> </>
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
            <> </>
            <input
              type="number"
              value={item.weight}
              onChange={(e) => handleWeight(e, index)}
            />
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
