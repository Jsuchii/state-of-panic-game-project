import { Canvas } from '@react-three/fiber'
import { getProject } from '@theatre/core'
import { SheetProvider, PerspectiveCamera } from '@theatre/r3f'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

// Imports for your UI architecture
import { MainMenu } from './components/Menus/MainMenu'
import { TypingOverlay } from './components/UI/TypingOverlay'
import { useGameStore } from './stores/useGameStore'

// Initialize Theatre.js studio
studio.initialize()
studio.extend(extension)

// The animation sheet
const demoSheet = getProject('State of Panic').sheet('Level 1')

export default function App() {
  // 1. Subscribe to the game status ("ready", "playing", or "game-over")
  const gameStatus = useGameStore((state) => state.gameStatus)

  return (
    // The Main Container (Full Screen)
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      
      {/* LAYER 1: 3D Scene (Background) */}
      <Canvas>
        <SheetProvider sheet={demoSheet}>
          <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 10]} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          {/* Your Spinning Cube (Placeholder for future city) */}
          <mesh rotation={[0.5, 0.5, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </SheetProvider>
      </Canvas>

      {/* LAYER 2: UI Overlay (Foreground) */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none' // Allows clicks to pass through empty areas
      }}>
        
        {/* THE ROUTER: Decides which screen to show */}
        {gameStatus === 'ready' ? (
           <MainMenu /> 
        ) : (
           <TypingOverlay />
        )}

      </div>

    </div>
  )
}