import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Switch from "./components/Switch";
import NameContainer from "./components/NameContainer";
import Notification from "./components/Notification";

export default function App() {
  // const [formName, setFormName] = useState<undefined | string>("");
  const [names, setNames] = useState<string[]>([]);
  const [isPerson, setIsPerson] = useState(true);
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string | null>();

  const nameRef = useRef();

  // when submitting a new new, use useRef hook to store name value
  // instead of useState + onChange to prevent rerenders on each keypress
  function handleSubmit(e) {
    e.preventDefault();
    //@ts-ignore
    if (nameRef.current.value.length === 0) {
      setError("Please add something to pick!");
      setTimeout(() => setError(null), 5000);
      return;
    }

    const inputName: string = nameRef.current.value;
    const newNames: string[] = [...names, inputName];
    setNames(newNames);
    // @ts-ignore
    nameRef.current.value = "";
  }

  function pick() {
    setError(null);
    if (names.length === 0) {
      setError("Nothing to pick!");
      setTimeout(() => setError(null), 5000);
    }

    if (count > names.length) {
      setError("There aren't enough to pick!");
      setTimeout(() => setError(null), 5000);
    }

    // ADD VALIDATION FOR APPROPRIATE COUNT SELECTED BASED ON INPUTTED USERS

    // randomize the order of the names
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

    if (isPerson) {
      console.log(randomNames.slice(0, count));
    } else {
      // find remainder of people
      const perGroup = Math.floor(randomNames.length / count);
      let remainder = randomNames.length % count;

      const groupObj = {};

      for (let i = 0; i < count; i++) {
        // loop to handle creating a given group

        let start = perGroup * i;
        let end = start + perGroup;
        if (remainder > 0) {
          end++;
          remainder--;
        }
        // @ts-ignore
        groupObj[`${i}`] = randomNames.slice(start, end);
      }

      console.log(groupObj);
    }
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

      {/* Form to add names */}
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="inputName">Name:</label> */}
        <input
          type='text'
          ref={nameRef}
          name='inputName'
          // value={formName}
          maxLength={20}
          // onChange={(e) => setFormName(e.target.value)}
        />
        <button
          className='mainButton'
          type='submit'
          onSubmit={(e) => handleSubmit(e)}
        >
          Add
        </button>
      </form>

      <div className='pickCount'>
        <button
          className='countButton'
          onClick={() => (count > 1 ? setCount(count - 1) : setCount(1))}
        >
          -
        </button>
        <input
          type='number'
          name='count'
          value={count}
          required
          maxLength={1}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button
          className='countButton'
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
      <button
        className='mainButton'
        onClick={() => pick()}
      >
        Pick
      </button>
      <Notification message={error} />
      <NameContainer
        names={names}
        isPerson={isPerson}
        count={count}
      />
    </>
  );
}
///https://stackoverflow.com/questions/42733986/how-to-wait-and-fade-an-element-out
