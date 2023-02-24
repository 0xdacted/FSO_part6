import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = [0, 0, 0]

  test('should return a proper initial state when called with undefined state', () => {
    const state = undefined
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState.slice()

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([1, 0, 0])
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState.slice()

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([0, 1, 0])
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState.slice()

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([0, 0, 1])
  })

  test('zero resets all values to zero', () => {
    const action = {
      type: 'ZERO'
    }
    const state = [2, 3, 1]

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([0, 0, 0])
  })
})