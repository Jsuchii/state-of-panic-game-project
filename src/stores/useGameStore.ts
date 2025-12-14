import { create } from 'zustand'

interface GameState {
  score: number
  targetState: string // The state the player needs to type (e.g., "Texas")
  userInput: string   // What the player has typed so far (e.g., "Tex")
  
  // Actions
  handleKeyStroke: (key: string) => void
  resetLevel: () => void
}

const STATES_POOL = ["California", "Texas", "Florida", "New York", "Ohio"]

export const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  targetState: "California", // Default start
  userInput: "",

  handleKeyStroke: (key) => {
    const { targetState, userInput, score } = get()
    
    // 1. Calculate the new string if they typed the next correct letter
    const expectedChar = targetState[userInput.length].toLowerCase()
    
    if (key.toLowerCase() === expectedChar) {
      const newUserInput = userInput + key
      
      // 2. Check if they finished the word
      if (newUserInput.toLowerCase() === targetState.toLowerCase()) {
        // SUCCESS!
        const nextState = STATES_POOL[Math.floor(Math.random() * STATES_POOL.length)]
        set({ 
          score: score + 100, 
          userInput: "", 
          targetState: nextState 
        })
      } else {
        // Just add the letter
        set({ userInput: newUserInput })
      }
    } else {
      // WRONG KEY! (Optional: You could add a 'lives' penalty here later)
      console.log("Wrong key!") 
    }
  },

  resetLevel: () => set({ score: 0, userInput: "" })
}))