import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <label htmlFor='names'>Name:</label>
    <input id='names' type="text"></input>
    <button>Add</button>

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
    </>
  )
}

export default App
