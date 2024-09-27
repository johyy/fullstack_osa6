import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import anecdotes from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdotesSlice.actions

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotes.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(showNotification(`you added '${newAnecdote.content}'`, 5))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const savedAnecdote = await anecdotes.updateAnecdote(anecdote.id, votedAnecdote)
    
    dispatch(voteAnecdote(savedAnecdote))
    dispatch(showNotification(`you voted '${votedAnecdote.content}'`, 5))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdotes.getAll()
    dispatch(setAnecdotes(anecs))
  }
}

export default anecdotesSlice.reducer