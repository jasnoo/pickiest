type CounterProps = {
    count: number;
    checkCount: () => void;
    incrementCount: () => void;
    decrementCount: () => void;
    setCount: (count: number) => void;

}
function Counter({ count, checkCount, incrementCount, decrementCount, setCount }: CounterProps) {
    return (
        <div className='pickCount'>
            <button
                className='countButton'
                onClick={() => decrementCount()}
            >
                -
            </button>
            <input
                type='number'
                name='count'
                value={count}
                required
                maxLength={2}
                onChange={(e) => setCount(Number(e.target.value))}
                onBlur={() => checkCount()}
            />
            <button
                className='countButton'
                onClick={() => incrementCount()}
            >
                +
            </button>
        </div>
    )
}
export default Counter;