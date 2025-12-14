import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from './useGameStore'

// Reset the store before every test so they don't interfere with each other
beforeEach(() => {
  useGameStore.setState({
    score: 0,
    targetState: 'Texas', // Force a specific state for testing
    userInput: '',
    gameStatus: 'playing', // <--- FIX: Force the game to be active!
    timeLeft: 30
  })
})

describe('Game Logic (Store)', () => {
  
  it('initializes with zero score', () => {
    // We manually set score to 0 in beforeEach, checking it here
    const { score } = useGameStore.getState()
    expect(score).toBe(0)
  })

  it('accepts correct keystrokes', () => {
    // Simulate typing "T" for "Texas"
    useGameStore.getState().handleKeyStroke('t')
    
    const { userInput } = useGameStore.getState()
    expect(userInput).toBe('t')
  })

  it('ignores wrong keystrokes', () => {
    // Simulate typing "X" for "Texas" (Wrong!)
    useGameStore.getState().handleKeyStroke('x')
    
    const { userInput } = useGameStore.getState()
    expect(userInput).toBe('') // Should not have added the 'x'
  })

  it('detects a win and updates score', () => {
    // Type "Texas" completely
    const store = useGameStore.getState()
    store.handleKeyStroke('t')
    store.handleKeyStroke('e')
    store.handleKeyStroke('x')
    store.handleKeyStroke('a')
    store.handleKeyStroke('s')

    // Check results
    const newState = useGameStore.getState()
    expect(newState.score).toBe(100)
    expect(newState.userInput).toBe('') // Should reset input
    
    // We can't check targetState is NOT Texas easily anymore since it's random,
    // but we can check that a new target was picked if we wanted.
    // For now, checking the score is sufficient proof of a win.
  })
})