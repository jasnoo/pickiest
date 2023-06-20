function Results( {showResults, results}){
    if (showResults) {
        return  (
            <>
            <h1>Results</h1>
            <ul>
            {Object.values(results).map((x,i) => <li>{x.join(", ")}</li>)}
            </ul>
            </>
        )
        } else {
           <></> 
        }
}
export default Results