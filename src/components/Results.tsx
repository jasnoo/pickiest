function Results( {showResults, results}){
    if (showResults) {
        return  (
            <div className='pickedResults'>
                <h1>Results</h1>
                <ul>
                    {Object.values(results).map((x,i) => <li><strong>Group {i+1}: </strong> <br/>{x.join(", ")}</li>)}
                </ul>
            </div>
        )
        } else {
           <></> 
        }
}
export default Results