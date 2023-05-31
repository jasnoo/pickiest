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
    // if the user wants to pick individual people
    if (isPerson) {
      const chosen: Number[] = [];
      if (count > chosen.length) {
        console.log("count is too big");
      }
      while (chosen.length < count) {
        let chosenIndex = Math.floor(Math.random() * names.length);
        if (!chosen.includes(chosenIndex)) {
          chosen.push(chosenIndex);
        }
        const chosenNames = chosen.map((x) => names[x]);
        console.log(chosenNames);
      }
    }
    // if the user wants to break out into groups
    else {
    }
  }

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
        <button onClick={() => pick()}>Pick</button>
      </form>

      <NameContainer names={names} />
    </>
  );
}
