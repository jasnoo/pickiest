import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Switch from "./components/Switch";
import NameContainer from "./components/NameContainer";
import Notification from "./components/Notification";
import Results from "./components/Results";

export default function App() {
  // const [formName, setFormName] = useState<undefined | string>("");
  const [names, setNames] = useState<string[]>([]);
  const [isPerson, setIsPerson] = useState(true);
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string | null>();
  const [showResults, setShowResults] = useState<boolean>(false)
  const [results, setResults] = useState<string[] | object>(null)

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

  function reset(){
    setNames([])
    setShowResults(false)
  }

  function pick() {
    setError(null);
    if (names.length === 0) {
      setError("Nothing to pick!");
      setTimeout(() => setError(null), 5000);
    }

    if (count > names.length) {
      setError("There aren't enough to pick from! Add more items");
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
      let chosen = {'0':randomNames.slice(0, count)}
      setResults(chosen)
      console.log(results);
    } else {
      // find remainder of people
      const perGroup = Math.floor(randomNames.length / count);
      let remainder = randomNames.length % count;

      const groupObj = {};
      let start = 0
      for (let i = 0; i < count; i++) {
        // loop to handle creating a given group
        console.log('randomNames', randomNames)
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
      console.log('groupObj', groupObj);
      console.log('results', results);
    }
    setShowResults(true)
  }



  function toggleIsPerson() {
    console.log("this is happening?");
    isPerson ? setIsPerson(false) : setIsPerson(true);
  }
  

  return (
    <>
      <Header />

      <Switch handleToggle={toggleIsPerson} />


      <div className='pickCount'>
        <button
          className='countButton'
          onClick={() => {
            count > 1 ? setCount(count - 1) : setCount(1)
          }}
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
          onClick={() => {
            if (count < 6) {
              setCount(count + 1)
            }
            
          }}
        >
          +
        </button>
      </div>

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
      <button
        className='mainButton'
        onClick={() => pick()}
      >
        Pick
      </button>

      <button
        className='mainButton'
        onClick={() => reset()}
      >
        Reset
      </button>
      <Notification message={error} />
      <NameContainer className = 'nameContainer'
        names={names}
        isPerson={isPerson}
        count={count}
      />
        <Results showResults={showResults} results={results}/>

    </>
  );
}
///https://stackoverflow.com/questions/42733986/how-to-wait-and-fade-an-element-out




