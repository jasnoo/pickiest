type NameContainerProps = {
  names: string[];
  isPerson: boolean;
  count: number;
}

// count is count of chosen things
function NameContainer({ names, isPerson, count }: NameContainerProps) {
  const containerText = isPerson ? "Individual" : "Group";
  const plural = count > 1 ? "s" : "";

  if (names.length !== 0) {
    return (
      <div className='nameContainer'>
        <h2>{`Pick ${count} ${containerText}${plural} from:`}</h2>
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
      </div>
    );
  } else return null;
}

export default NameContainer;
