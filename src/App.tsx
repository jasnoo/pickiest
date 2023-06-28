import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Switch from "./components/Switch";
import NameContainer from "./components/NameContainer";
import Notification from "./components/Notification";
import Results from "./components/Results";
import Footer from "./components/Footer";
import Counter from "./components/Counter";


export default function App() {
  // const [formName, setFormName] = useState<undefined | string>("");
  const [names, setNames] = useState<string[]>([]);
  const [isPerson, setIsPerson] = useState(true);
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string | null>();
  const [showResults, setShowResults] = useState<boolean>(false)
  const [results, setResults] = useState<[] | object>([])

  const nameRef = useRef<HTMLInputElement>(null!);

  // when submitting a new new, use useRef hook to store name value
  // instead of useState + onChange to prevent rerenders on each keypress
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setShowResults(false);

    if (nameRef.current.value.length === 0) {
      setError("Item field cannot be empty!");
      return;
    }

    // if (count <= 0) {
    //   setError("You need to pick at least 1 item or 2 groups!")
    //   isPerson ? setCount(1) : setCount(2);
    //   return;
    // }

    if (names.includes(nameRef.current.value)) {
      setError("Item has already been added to list.");
      return;
    }
    const inputName: string = nameRef.current.value;
    const newNames: string[] = [...names, inputName];
    setNames(newNames);
    nameRef.current.value = "";
  }

  // resets the inputted names
  function reset() {
    setNames([])
    setShowResults(false)
  }

  // function to pick random individual or groups from list of items
  function pick() {

    // error if no items have been inputted
    setError(null);
    if (names.length === 0) {
      setError("Please add items to pick from!");
    }

    // error if the number to choose is > than number of items inputted
    else if (count > names.length) {
      setError("Please add more items to pick from!");
    }

    // error if user tries to only choose 1 group
    else if (count === 1 && !isPerson) {
      setError("There must be at least 2 groups. Please pick at least 2 groups or choose individuals instead.");

    }

    else {
      // randomize the order of the names
      const randomizeArrOrder = (arr: string[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      };
      const randomNames = names.slice();
      randomizeArrOrder(randomNames);

      // if user selects picking individuals 
      if (isPerson) {
        const chosen = { '0': randomNames.slice(0, count) }
        setResults(chosen)
      } else {
        // if user selects picking individuals 

        // find remainder based on making even groups 
        const perGroup = Math.floor(randomNames.length / count);
        let remainder = randomNames.length % count;

        // group object will hold all selected groups
        const groupObj = {};
        let start = 0
        for (let i = 0; i < count; i++) {
          // loop to handle creating each group, handles any remainder 
          let end = start + perGroup;
          if (remainder > 0) {
            end++
            remainder--;
          }
          // @ts-ignore
          groupObj[`${i}`] = randomNames.slice(start, end);
          start = end
        }
        setResults(groupObj)
      }
      setShowResults(true)
    }
  }

  // sets when user toggles between choosing individual or groups
  function toggleIsPerson() {
    setShowResults(false);
    setError(null);
    if (isPerson && count === 1) {
      setCount(2)
    }
    setIsPerson(!isPerson)
  }

  // when user clicks (-) button for count 
  function decrementCount() {
    setError(null);
    setShowResults(false);
    count > 1 ? setCount(count - 1) : setCount(1);
  }
  // when user clicks (+) button for count 
  function incrementCount() {
    setError(null);
    setShowResults(false);
    if (count < 12) {
      setCount(count + 1)
    }

  }
  // if user tries to type invalid number into count field
  function checkCount() {
    if (count <= 0) {
      isPerson ? setCount(1) : setCount(2);
      return;
    }
    else if (count > 12) {
      setCount(12)
    }

  }

  return (
    <>
      <div className="content">
        <Header />
        <div className="pickChoices">
          {/* Counter */}
          <Counter count={count} checkCount={checkCount} incrementCount={incrementCount} decrementCount={decrementCount} setCount={setCount} />
          {/* Individual/Group toggle */}
          <Switch handleToggle={toggleIsPerson} />
        </div>

        {/* Form to add items */}
        <form onSubmit={handleSubmit}>
          {/* <form> */}
          <input
            type='text'
            ref={nameRef}
            name='addItem'
            maxLength={20}
            aria-label="addItem"
          />
          <button
            className='btn'
            type='submit'
          // onClick={handleSubmit}
          >
            Add Item
          </button>
        </form>
        <div className='mainButtonContainer'>
          {/* Pick button */}
          <button
            className='btn mainButton'
            onClick={() => pick()}
          >
            Pick
          </button>
          {/* Reset button */}
          <button
            className='btn mainButton'
            onClick={() => {
              setError(null);
              reset()
            }
            }
          >
            Reset
          </button>
        </div>
        {/* Error */}
        <Notification message={error} />
        {/* Container for all inputted items */}
        <NameContainer
          names={names}
          isPerson={isPerson}
          count={count}
        />
        {/* Container for the results of picking */}
        <Results showResults={showResults} isPerson={isPerson} count={count} results={results} />
      </div>
      <Footer />
    </>
  );
}