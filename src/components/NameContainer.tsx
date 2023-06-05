import { useState } from "react";

// count is count of chosen things
function NameContainer({ names, isPerson, count }) {
  const containerText = isPerson ? "Individual" : "Group";
  const plural = count > 1 ? "s" : "";

  if (names.length !== 0) {
    return (
      <>
        <h2>{`Choose ${count} ${containerText}${plural} from:`}</h2>
        <div className='itemsContainer'>
          {names.map((x, i) => (
            <div
              className='items'
              key={`name-${i}`}
            >
              {x}
            </div>
          ))}
        </div>
      </>
    );
  } else return <div />;
}

export default NameContainer;
