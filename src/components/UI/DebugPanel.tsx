import { useGameStore } from '../../stores/useGameStore'
import { stateNames } from '../../data/stateData'

export const DebugPanel = () => {
  const activeNeighbors = useGameStore((state) => state.activeNeighbors)
  const targetCode = useGameStore((state) => state.targetCode)
  const gameStatus = useGameStore((state) => state.gameStatus)

  // Helper to get name from code
  const getName = (code: string) => stateNames.get(code) || code

  // Only show when playing
  if (gameStatus !== 'playing') return null

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#00ff00',
      padding: '15px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      pointerEvents: 'none', // Lets clicks pass through
      textAlign: 'left',
      border: '1px solid #00ff00'
    }}>
      <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #555' }}>DEV TOOLS</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong style={{ color: 'gold' }}>BASE:</strong> {getName(targetCode)}
      </div>

      <strong>VALID TARGETS ({activeNeighbors.length}):</strong>
      <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px', color: 'white' }}>
        {activeNeighbors.map(code => (
          <li key={code}>
            {getName(code)} <span style={{ opacity: 0.5 }}>({code})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
