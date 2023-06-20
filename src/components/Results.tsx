function Results( {showResults, results, isPerson, count}){
    if (showResults) {
        return  (
            <div className='pickedResults'>
                {/* <h1>Results</h1> */}
                <ul>
                    {Object.values(results).map((x,i) => <li><strong>{isPerson ? `${count} Individual${count > 1 ? 's':''}:`: `Group ${i+1}:` } </strong> <br/>{x.join(", ")}</li>)}
                </ul>
            </div>
        )
        } else {
           <></> 
        }
}
export default Results