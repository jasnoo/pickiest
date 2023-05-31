import { useState } from "react";

// count is count of chosen things
function NameContainer({ names }) {
  // const [chosenNames, setChosenNames] = useState(false);

  // function that determines which individual people to choose
  // function choosePerson() {
  //   if (isPerson) {
  //     const chosen: Number[] = [];
  //     while (chosen.length < count) {
  //       let chosenIndex = Math.floor(Math.random() * names.length);
  //       if (!chosen.includes(chosenIndex)) {
  //         chosen.push(chosenIndex);
  //       }

  //       const chosenNames = chosen.map((x) => names[x]);
  //       console.log(chosenNames);
  //     }
  //   }
  // }

  // choosePerson();

  // function that determines groups

  // function chooseGroups() {}

  return (
    <ul>
      <h2>All Names</h2>
      {names.map((x, i) => (
        <li key={`name-${i}`}>{x}</li>
      ))}
    </ul>
  );
}

export default NameContainer;
