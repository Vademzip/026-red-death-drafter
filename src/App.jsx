import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Drafter from "./components/Drafter/Drafter.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {

  return (
    <>
        <Header/>
        <Drafter/>
        <Footer/>
    </>
  )
}

export default App
