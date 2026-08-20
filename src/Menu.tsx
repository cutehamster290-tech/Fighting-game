import { useState } from "react"
import './css/Menu.css'

type cs = { changeScreen: (screen: string) => void }
const Modes = ['Easy', 'Normal', 'Hard']

export const Menu = ({ changeScreen }: cs) => {
    const [mode, setMode] = useState('Easy')
    let message

    function changeMode(md: string) {
        setMode(md)
        message = setMessage(mode)
    }

    function setMessage(mode: string) {
        message = JSON.stringify({
        mode: mode
        })
    }

  return (
    <div id="Menu">
      <div id='Mode'> {Modes.map((m) => (
            <button key={m} onClick={() => changeMode(m)}>{m}</button>
        ))}
      </div>
      <h3 id='modeDisplay'>Chosen Mode: {mode}</h3>
      <button id="Confirm" onClick={() => changeScreen('Game')}>Confirm</button>
    </div>
  )
}