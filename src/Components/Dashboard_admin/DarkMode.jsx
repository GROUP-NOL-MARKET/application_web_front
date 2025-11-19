import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import '../css/Header.css'

const DarkMode = () => {

    const context = useContext(ThemeContext);

  return (
    <>
    <div className="toggle">
        Dark Mode
        <input type="checkbox" className="toggle"
               id="modeDark" onClick={context.toggleThemeMode} />
        <label for="modeDark"></label>
    </div>
    </>
  )
}

export default DarkMode