import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Switch from './components/Switch'




export default function App() {
  const [formName, setFormName] = useState<undefine | string>()
  const [names, setNames] = useState<string[]>([])
  const [isPerson, setIsPerson] = useState(true)
  
  function handleSubmit(e){
    e.preventDefault()
    const newNames = [...names,formName]
    setNames(newNames)
    setFormName('')
  }

  function toggle(){

  }

  return (
    <>
    <Header/>
    
     {/* Form to add names */}
    <form onSubmit={handleSubmit}>
    <label htmlFor='inputName'>Name:</label>
    <input type='text' name='inputName' value={formName} required maxLength={20} onChange={e=>setFormName(e.target.value)}/>
    <button type='submit' onSubmit={e=> handleSubmit(e)}>Add</button>
    </form>

    <Switch/>
    
       

 

    </>
  )
}
