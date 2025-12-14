import { useEffect } from 'react'
import { useGameStore } from '../../stores/useGameStore'

export const TypingOverlay = () => {
  const { 
    targetState, 
    userInput, 
    score, 
    timeLeft, 
    gameStatus, 
    handleKeyStroke, 
    tickTimer,
    restartGame 
  } = useGameStore()

  // 1. Keyboard Listener (Only active when playing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent spacebar scrolling
      if (e.key === ' ') e.preventDefault()
      
      // Allow typing only if game is playing
      if (gameStatus === 'playing' && /^[a-zA-Z ]$/.test(e.key)) {
        handleKeyStroke(e.key)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyStroke, gameStatus])

  // 2. The Timer Interval (The Heartbeat)
  useEffect(() => {
    if (gameStatus === 'playing') {
      const interval = setInterval(() => {
        tickTimer()
      }, 1000) // Run every 1 second
      
      return () => clearInterval(interval) // Cleanup
    }
  }, [gameStatus, tickTimer])

  // --- RENDER LOGIC ---

  // CASE 1: Main Menu is active
  // We return NULL so this component is invisible, letting MainMenu.tsx show through.
  if (gameStatus === 'ready') return null

  // CASE 2: Game Over Screen
  if (gameStatus === 'game-over') {
    return (
      <div style={centeredStyle}>
        <h1 style={{ color: '#ff4444', fontSize: '3rem', margin: 0 }}>CRITICAL FAILURE</h1>
        <h2 style={{ fontSize: '1.5rem' }}>FINAL SCORE: {score}</h2>
        
        <button 
          onClick={restartGame} 
          style={buttonStyle}
        >
          RETRY SYSTEM
        </button>
      </div>
    )
  }

  // CASE 3: Gameplay HUD (Default)
  return (
    <div style={gameContainerStyle}>
      <h2 style={{ fontSize: '2rem', margin: 0 }}>TARGET: {targetState.toUpperCase()}</h2>

      {/* The Visual Logic: Green for typed, Gray for remaining */}
      <div style={{ fontSize: '4rem', fontWeight: 'bold', letterSpacing: '5px' }}>
        <span style={{ color: '#00ff00' }}>{userInput}</span>
        <span style={{ color: '#555' }}>{targetState.slice(userInput.length)}</span>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '40px', fontSize: '1.5rem', justifyContent: 'center' }}>
        <div>SCORE: {score}</div>
        {/* Timer turns red when under 10 seconds */}
        <div style={{ color: timeLeft < 10 ? '#ff4444' : 'white' }}>
          TIME: {timeLeft}s
        </div>
      </div>
    </div>
  )
}

// --- STYLES ---

const centeredStyle: React.CSSProperties = {
  position: 'absolute', 
  top: '50%', 
  left: '50%', 
  transform: 'translate(-50%, -50%)',
  textAlign: 'center', 
  color: 'white', 
  fontFamily: 'Courier New, monospace',
  background: 'rgba(0, 0, 0, 0.85)', 
  padding: '40px 60px', 
  borderRadius: '10px',
  border: '2px solid #333',
  pointerEvents: 'auto' // Ensures the button is clickable
}

const gameContainerStyle: React.CSSProperties = {
  position: 'absolute', 
  bottom: '10%', 
  left: '50%', 
  transform: 'translateX(-50%)',
  textAlign: 'center', 
  color: 'white', 
  fontFamily: 'Courier New, monospace',
  textShadow: '0px 0px 10px black',
  width: '100%'
}

const buttonStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '10px 30px',
  fontSize: '1.2rem',
  cursor: 'pointer',
  background: 'white',
  color: 'black',
  border: 'none',
  fontFamily: 'inherit',
  fontWeight: 'bold'
}