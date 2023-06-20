function Results({ showResults, results, isPerson, count }) {
    if (showResults) {
        return (
            <div className='pickedResults'>
                <h1>Results</h1>
                <ul>
                    {Object.values(results).map((x, i) => <li><div className='groupText'>{isPerson ? '' : `Group ${i + 1}:`} </div> {x.join(", ")}</li>)}
                </ul>
            </div>
        )
    } else {
        <></>
    }
}
export default Results