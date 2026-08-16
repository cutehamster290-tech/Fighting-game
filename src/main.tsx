import {StrictMode, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'red'
    ctx.fillRect(100, 100, 40, 100)
  })

  return (
    <canvas ref={canvasRef}></canvas>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)