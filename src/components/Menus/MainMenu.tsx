import { useGameStore } from '../../stores/useGameStore'

export const MainMenu = () => {
  // We only need the startGame action here
  const startGame = useGameStore((state) => state.startGame)

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.6)', // Darken the 3D background
      color: 'white',
      fontFamily: 'Courier New, monospace',
      pointerEvents: 'auto' // Important: Lets you click buttons
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0 0 20px 0', textShadow: '0 0 10px #000' }}>
        STATE OF PANIC
      </h1>
      
      <button 
        onClick={startGame}
        style={{
          padding: '15px 40px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          background: 'white',
          border: '2px solid white',
          fontFamily: 'inherit',
          fontWeight: 'bold',
          transition: 'all 0.2s'
        }}
        // Simple hover effect using inline CSS isn't possible directly, 
        // but for now, this is the structural implementation.
      >
        INITIATE
      </button>

      <p style={{ marginTop: '20px', opacity: 0.8 }}>
        TYPE TO SURVIVE
      </p>
    </div>
  )
}