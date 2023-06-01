import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Switch from "./components/Switch";
import NameContainer from "./components/NameContainer";

export default function App() {
  // const [formName, setFormName] = useState<undefined | string>("");
  const [names, setNames] = useState<string[]>([]);
  const [isPerson, setIsPerson] = useState(true);
  const [count, setCount] = useState<number>(1);

  const nameRef = useRef();

  // when submitting a new new, use useRef hook to store name value
  // instead of useState + onChange to prevent rerenders on each keypress
  function handleSubmit(e) {
    e.preventDefault();
    //@ts-ignore
    const inputName: string = nameRef.current.value;
    const newNames: string[] = [...names, inputName];
    setNames(newNames);
    // @ts-ignore
    nameRef.current.value = "";
  }

  function pick() {
    // randomize the order of the names
    // console.log(names);

    const randomizeArrOrder = (arr: string[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    };

    let randomNames = names.slice();
    randomizeArrOrder(randomNames);

    console.log(randomNames.slice(0, count));
    // console.log(names);
    // const randomized = randomizeArrOrder(names);
    // console.log(names);

    // // let randomChoice = randomized.slice(0, count);
    // console.log(randomized);
    // console.log(randomChoice);
  }

  // function pick() {
  //   // if the user wants to pick individual people
  //   if (isPerson) {
  //     const chosen: Number[] = [];
  //     if (count > names.length) {
  //       console.log("count is too big");
  //     } else {
  //       while (chosen.length < count) {
  //         let chosenIndex = Math.floor(Math.random() * names.length);
  //         if (!chosen.includes(chosenIndex)) {
  //           chosen.push(chosenIndex);
  //         }
  //         const chosenNames = chosen.map((x) => names[x]);
  //         console.log(chosenNames);
  //       }
  //     }
  //   }
  //   // if the user wants to break out into groups
  //   else {
  //     const groupObj = {};
  //     for (let i = 0; i < names.length; i++) {
  //       let temp: string = i.toString();
  //       groupObj[temp] = [];
  //     }

  //     let currentGroup = 0;

  //     // create behavior that loops between the groups which will be keys with empty arr
  //     let namesCopy = names.slice();
  //     while (namesCopy.length > 0) {
  //       let chosenIndex = Math.floor(Math.random() * namesCopy.length);
  //       groupObj[currentGroup.toString()].push(namesCopy[chosenIndex]);
  //       if (chosenIndex === 0) {
  //         namesCopy = namesCopy.slice(1);
  //       } else if (chosenIndex === namesCopy.length - 1) {
  //         let lastValue = namesCopy.length - 1;
  //         namesCopy = namesCopy.slice(0, lastValue);
  //       } else {
  //         namesCopy = namesCopy
  //           .slice(0, chosenIndex)
  //           .concat(namesCopy.slice(chosenIndex + 1));
  //       }
  //     }

  //     // copy names and basically while name copy has a length > 0, loop past keys
  //   }
  // }

  function toggleIsPerson() {
    console.log("this is happening?");
    isPerson ? setIsPerson(false) : setIsPerson(true);
  }

  return (
    <>
      <Header />

      <Switch handleToggle={toggleIsPerson} />

      <button onClick={() => setCount(count - 1)}>-</button>

      <input
        type="number"
        name="count"
        value={count}
        required
        maxLength={1}
        onChange={(e) => setCount(Number(e.target.value))}
      />

      <button onClick={() => setCount(count + 1)}>+</button>

      {/* Form to add names */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputName">Name:</label>
        <input
          type="text"
          ref={nameRef}
          name="inputName"
          // value={formName}
          required
          maxLength={20}
          // onChange={(e) => setFormName(e.target.value)}
        />
        <button type="submit" onSubmit={(e) => handleSubmit(e)}>
          Add
        </button>
      </form>
      <button onClick={() => pick()}>Pick</button>

      <NameContainer names={names} />
    </>
  );
}
