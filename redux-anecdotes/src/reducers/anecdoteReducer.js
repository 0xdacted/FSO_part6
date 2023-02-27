import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      anecdoteToVote.votes++
    },
    addAnecdote: (state, action) => {
      const newAnecdote = {
        id: getId(),
        content: action.payload,
        votes: 0
      }
      state.push(newAnecdote)
    }
  }
})

export const { voteForAnecdote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
