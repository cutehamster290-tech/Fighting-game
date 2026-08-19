import {StrictMode, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {Game} from './Game.tsx'
import {Menu} from './Menu.tsx'
import './css/main.css'

function App() {
  let [opened, setOpened] = useState('Menu')

  return (
    <StrictMode>
      {opened == 'Game' && <Game />}
      {opened == 'Menu' && <Menu changeScreen={setOpened}/>}
    </StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)