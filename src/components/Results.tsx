export type ResultsProps = {
    showResults: boolean;
    results: object;
    isPerson: boolean;
}
function Results({ showResults, results, isPerson }: ResultsProps) {
    if (showResults) {
        return (
            <div className='pickedResults'>
                <h1>Results</h1>
                <ul>
                    {Object.values(results).map((x, i) => <li key={`item${x}`}><div className='groupText'>{isPerson ? '' : `Group ${i + 1}:`} </div> {x.join(", ")}</li>)}
                </ul>
            </div>
        )
    } else {
        return null
    }
}
export default Results