import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Switch from "./components/Switch";

export default function App() {
  const [formName, setFormName] = useState<undefined | string>();
  const [names, setNames] = useState<string[]>([]);
  const [isPerson, setIsPerson] = useState(true);
  const [count, setCount] = useState<number>(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newNames = [...names, formName];
    setNames(newNames);
    setFormName("");
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
          name="inputName"
          value={formName}
          required
          maxLength={20}
          onChange={(e) => setFormName(e.target.value)}
        />
        <button type="submit" onSubmit={(e) => handleSubmit(e)}>
          Add
        </button>
      </form>
    </>
  );
}
