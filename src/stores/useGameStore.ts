import { create } from 'zustand'

// 1. Define the Shape of the Store (The Interface)
interface GameState {
  // Data
  score: number
  targetState: string
  userInput: string
  gameStatus: 'ready' | 'playing' | 'game-over' // <--- The errors are asking for this
  timeLeft: number                              // <--- And this

  // Actions (Functions)
  handleKeyStroke: (key: string) => void
  startGame: () => void                         // <--- And this
  tickTimer: () => void
  restartGame: () => void
}

const STATES_POOL = ["California", "Texas", "Florida", "New York", "Ohio", "Washington", "Nevada"]
const INITIAL_TIME = 30 

export const useGameStore = create<GameState>((set, get) => ({
  // Initial Data
  score: 0,
  targetState: "California", 
  userInput: "",
  gameStatus: 'ready', // Default state
  timeLeft: INITIAL_TIME,

  // --- ACTIONS ---

  handleKeyStroke: (key) => {
    const { targetState, userInput, score, gameStatus, timeLeft } = get()
    
    // Stop if game is not active
    if (gameStatus !== 'playing') return

    const expectedChar = targetState[userInput.length].toLowerCase()
    
    // Check key match
    if (key.toLowerCase() === expectedChar) {
      const newUserInput = userInput + key
      
      // Word Finished?
      if (newUserInput.toLowerCase() === targetState.toLowerCase()) {
        const nextState = STATES_POOL[Math.floor(Math.random() * STATES_POOL.length)]
        set({ 
          score: score + 100, 
          userInput: "", 
          targetState: nextState,
          timeLeft: timeLeft + 2 // Bonus time
        })
      } else {
        // Continue typing
        set({ userInput: newUserInput })
      }
    }
  },

  startGame: () => set({ 
    gameStatus: 'playing', 
    timeLeft: INITIAL_TIME, 
    score: 0, 
    userInput: '' 
  }),

  tickTimer: () => {
    const { timeLeft, gameStatus } = get()
    if (gameStatus !== 'playing') return

    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 })
    } else {
      set({ gameStatus: 'game-over' })
    }
  },

  restartGame: () => set({ 
    gameStatus: 'ready', 
    userInput: '', 
    score: 0,
    timeLeft: INITIAL_TIME
  })
}))