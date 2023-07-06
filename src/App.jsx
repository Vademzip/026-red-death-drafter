import {Suspense, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Drafter from "./components/Drafter/Drafter.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Global, css } from '@emotion/react'
function App() {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 18 || hour < 6) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);
  return (
      <>
        <Global
            styles={css`
              body {
                background-color: ${theme === 'light' ? 'white' : '#0a1731'};
                color: ${theme === 'light' ? 'black' : 'white'};
              }

             

              div {
                border-color: ${theme === 'light' ? 'black' : 'white'} !important;
              }
            `}
        />
        <Header theme = {theme}/>
        <Drafter/>
        <Footer theme={theme}/>
    </>
  )
}

export default App
