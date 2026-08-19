import {StrictMode, useState} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App = () => {
  const [mode, setMode] = useState('Easy')

  return (
    <div id="Main">
      <div id='Mode'>
        <button onClick={() => setMode('Easy')}>Easy</button>
        <button onClick={() => setMode('Normal')}>Normal</button>
        <button onClick={() => setMode('Hard')}>Hard</button>
      </div>
      <h3 id='modeDisplay'>Chosen Mode: {mode}</h3>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)