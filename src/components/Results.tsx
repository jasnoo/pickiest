type ResultsProps = {
    showResults: boolean;
    results: object | null;
    isPerson: boolean;
    count: number;
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
        <></>
    }
}
export default Results