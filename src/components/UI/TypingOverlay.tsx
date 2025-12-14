import { useEffect } from 'react'
import { useGameStore } from '../../stores/useGameStore'

export const TypingOverlay = () => {
  const {
    userInput, 
    score, 
    timeLeft, 
    gameStatus, 
    handleKeyStroke, 
    handleBackspace,
    tickTimer,
    restartGame 
  } = useGameStore()

  // 1. Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent spacebar scrolling
      if (e.key === ' ') e.preventDefault()
      
      // Strict Validation: ONLY letters (a-z, A-Z) allowed. No numbers, no symbols.
      if (gameStatus === 'playing' && /^[a-zA-Z]$/.test(e.key)) {
        handleKeyStroke(e.key)
      }
      
      // Handle Backspace if you want to allow correcting mistakes (Optional but recommended)
      if (gameStatus === 'playing' && e.key === 'Backspace') {
        handleBackspace()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyStroke, handleBackspace, gameStatus])

  // 2. Timer Heartbeat
  useEffect(() => {
    if (gameStatus === 'playing') {
      const interval = setInterval(tickTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [gameStatus, tickTimer])

  // --- RENDER LOGIC ---

  if (gameStatus === 'ready') return null

  if (gameStatus === 'game-over') {
    return (
      <div style={centeredStyle}>
        <h1 style={{ color: '#ff4444', fontSize: '3rem', margin: 0 }}>CRITICAL FAILURE</h1>
        <h2 style={{ fontSize: '1.5rem' }}>FINAL SCORE: {score}</h2>
        <button onClick={restartGame} style={buttonStyle}>RETRY SYSTEM</button>
      </div>
    )
  }

  // GAMEPLAY HUD
  return (
    <div style={gameContainerStyle}>
      {/* PLACEHOLDER LOGIC: Show gray text if input is empty */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        
        {/* The Placeholder (Behind) */}
        {userInput.length === 0 && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            color: 'rgba(255, 255, 255, 0.3)', // Transparent Gray
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            ENTER TEXT
          </div>
        )}

        {/* The Actual Input (Foreground) */}
        <div style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold', 
          letterSpacing: '5px', 
          textTransform: 'uppercase',
          minHeight: '4rem' // Keeps space open even if empty
        }}>
          {userInput}
        </div>

      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '40px', fontSize: '1.5rem', justifyContent: 'center' }}>
        <div>SCORE: {score}</div>
        <div style={{ color: timeLeft < 10 ? '#ff4444' : 'white' }}>
          TIME: {timeLeft}s
        </div>
      </div>
    </div>
  )
}

// --- STYLES ---
const centeredStyle: React.CSSProperties = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  textAlign: 'center', color: 'white', fontFamily: 'Courier New, monospace',
  background: 'rgba(0, 0, 0, 0.85)', padding: '40px 60px', 
  borderRadius: '10px', border: '2px solid #333', pointerEvents: 'auto'
}

const gameContainerStyle: React.CSSProperties = {
  position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
  textAlign: 'center', color: 'white', fontFamily: 'Courier New, monospace',
  textShadow: '0px 0px 10px black', width: '100%'
}

const buttonStyle: React.CSSProperties = {
  marginTop: '20px', padding: '10px 30px', fontSize: '1.2rem', cursor: 'pointer',
  background: 'white', color: 'black', border: 'none', fontFamily: 'inherit', fontWeight: 'bold'
}