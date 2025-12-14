import { create } from 'zustand'
import { getRandomStateName, stateNames, stateAdjacencyList } from '../data/stateData'

// Helper: Get code from Full Name (e.g. "California" -> "ca")
const getCodeByName = (fullName: string): string => {
  for (const [code, name] of stateNames.entries()) {
    if (name === fullName) return code
  }
  return ''
}

// Helper: Get Full Name from code (e.g. "ca" -> "California")
const getNameByCode = (code: string): string | undefined => {
  return stateNames.get(code)
}

interface GameState {
  score: number
  userInput: string
  gameStatus: 'ready' | 'playing' | 'game-over'
  timeLeft: number
  
  // NEW MAP LOGIC
  targetCode: string       // The "Golden" State (Current Base)
  activeNeighbors: string[] // GREEN States (Unlockable)
  conqueredStates: string[] // RED States (Already Guessed)

  // Actions
  handleKeyStroke: (key: string) => void
  handleBackspace: () => void
  startGame: () => void
  tickTimer: () => void
  restartGame: () => void
}

const INITIAL_TIME = 30 

export const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  userInput: "",
  gameStatus: 'ready',
  timeLeft: INITIAL_TIME,
  
  // Init Map Data
  targetState: "", // Deprecated, but keeping for compatibility if needed
  targetCode: "",
  activeNeighbors: [],
  conqueredStates: [],

  handleKeyStroke: (key) => {
    const { userInput, gameStatus, timeLeft, score, activeNeighbors, conqueredStates, targetCode } = get()
    
    if (gameStatus !== 'playing') return

    const newUserInput = userInput + key
    set({ userInput: newUserInput })

    // CHECK MATCH: Did we type ANY of the active neighbors?
    // We check against ALL green states + the Golden state (if you want it guessable)
    
    // 1. Check Neighbors (Green -> Red)
    const matchCode = activeNeighbors.find(code => {
      const fullName = getNameByCode(code)
      return fullName && fullName.toLowerCase() === newUserInput.toLowerCase()
    })

    if (matchCode) {
      // MATCH FOUND!
      
      // A. Add match to "Conquered" (Turn Red)
      const newConquered = [...conqueredStates, matchCode]
      
      // B. Unlock NEW neighbors from this conquered state
      const newNeighbors = Array.from(stateAdjacencyList.get(matchCode) || [])
      
      // C. Update the "Green" list:
      //    Start with existing neighbors
      //    + Add new neighbors found
      //    - Remove the one we just guessed
      //    - Remove any that are already conquered
      //    - Remove the current Golden state (it stays Gold)
      const updatedNeighbors = [...activeNeighbors, ...newNeighbors]
        .filter(code => code !== matchCode) // Remove guessed one
        .filter(code => !newConquered.includes(code)) // Remove already red ones
        .filter(code => code !== targetCode) // Keep Gold state Gold
        // Remove duplicates
        .filter((item, index, self) => self.indexOf(item) === index)

      set({ 
        score: score + 100, 
        userInput: "", 
        activeNeighbors: updatedNeighbors,
        conqueredStates: newConquered,
        timeLeft: timeLeft + 5 // Bonus time for expanding territory
      })
      return
    }

    // 2. Check Golden State (Gold -> Green)
    // Rule: "Golden state turns green (can be guessed)" implies it joins the pool later? 
    // Or did you mean "If I guess the neighbor, the Golden state becomes a normal neighbor"?
    // Implementing: If you type the Golden State's name (if allowed), treat it as a valid move?
    // For now, based on "Golden state turns green", I assume it gets swapped out or logic shifts.
    // Let's stick to: Guess Neighbors -> Expand.
  },

  handleBackspace: () => {
    const { userInput, gameStatus } = get()
    if (gameStatus !== 'playing') return
    set({ userInput: userInput.slice(0, -1) })
  },

  startGame: () => {
    // 1. Pick Random Start (The Golden State)
    const startName = getRandomStateName()
    const startCode = getCodeByName(startName)
    
    // 2. Get Initial Neighbors (The Green States)
    const startNeighbors = Array.from(stateAdjacencyList.get(startCode) || [])

    set({ 
      gameStatus: 'playing', 
      timeLeft: INITIAL_TIME, 
      score: 0, 
      userInput: '',
      targetCode: startCode,
      activeNeighbors: startNeighbors,
      conqueredStates: []
    })
  },

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
    timeLeft: INITIAL_TIME,
    activeNeighbors: [],
    conqueredStates: []
  })
}))