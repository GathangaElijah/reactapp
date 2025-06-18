import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App(props) {

  return (
    <>
     <header>
      <h1>{props.greeting}, {props.subject}! </h1>
     </header>
     <button type= "button" className="primary">Click me!</button>
    </>
  )
}

export default App
