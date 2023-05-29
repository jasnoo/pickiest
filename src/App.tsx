import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

interface FormNameState {
  inputName:string
}


export default function App() {
  const [formName, setFormName] = useState()
  const [names, setNames] = useState<string[]>([])

  function handleSubmit(e){
    console.log(formName)
    console.log(names)
    e.preventDefault()
    names.push(formName)
    setNames([...names].push(formName))

  }

  return (
    <>
    <Header/>
    <form onSubmit={handleSubmit}>
    <label htmlFor='inputName'>Name:</label>
    <input type='text' name='inputName' required maxLength={20} onChange={e=>setFormName(e.target.value)}/>
    <button type='submit' onSubmit={e=> handleSubmit(e)}>Add</button>

        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
    </form>
       
    </>
  )
}

// export default App
