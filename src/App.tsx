import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { SheetProvider } from '@theatre/r3f'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { getProject } from '@theatre/core'
import { TypingOverlay } from './components/UI/TypingOverlay'

// Initialize Theatre.js Studio (The Animation UI)
// This only runs in development mode
if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}

// Our Animation Project File
const demoSheet = getProject('US_States_Lore').sheet('MainScene')

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'black',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      {/* THE 3D WORLD */}
      <Canvas>
        <SheetProvider sheet={demoSheet}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />

          {/* Temporary Mesh to test Animation - We will replace this later */}
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>

          <OrbitControls />
        </SheetProvider>
      </Canvas>

      {/* THE UI OVERLAY */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            color: 'white',
            fontFamily: 'monospace',
          }}
        >
          <h1>US STATES: RELOADED</h1>
          <p>System Status: Online</p>
        </div>

        {/* NEW: The Typing Game */}
        <TypingOverlay />
      </div>
    </div>
  )
}

export default App
