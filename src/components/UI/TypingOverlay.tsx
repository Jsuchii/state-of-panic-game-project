import { useEffect } from 'react'
import { useGameStore } from '../../stores/useGameStore'

export const TypingOverlay = () => {
  const { targetState, userInput, score, handleKeyStroke } = useGameStore()

  // This "Effect" listens to your keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // FIX 1: Prevent the Spacebar from scrolling the page
      if (e.key === ' ') {
        e.preventDefault()
      }

      // FIX 2: Allow letters (A-Z) AND the Space character
      if (/^[a-zA-Z ]$/.test(e.key)) {
        handleKeyStroke(e.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyStroke])

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Courier New, monospace',
        textShadow: '0px 0px 10px black',
      }}
    >
      <h2 style={{ fontSize: '2rem', margin: 0 }}>TARGET IDENTIFICATION</h2>

      {/* The Visual Logic: Green for typed, Gray for remaining */}
      <div style={{ fontSize: '4rem', fontWeight: 'bold', letterSpacing: '5px' }}>
        <span style={{ color: '#00ff00' }}>{userInput}</span>
        <span style={{ color: '#555' }}>{targetState.slice(userInput.length)}</span>
      </div>

      <div style={{ marginTop: '20px', fontSize: '1.5rem' }}>SCORE: {score}</div>
    </div>
  )
}
