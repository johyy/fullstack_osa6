import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      const filter = state.filter || ''
      return state.anecdotes.filter(anecdote =>
        typeof anecdote.content === 'string' && anecdote.content.includes(filter)
      )
    })
  
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      dispatch(voteForAnecdote(anecdote))
    }
  
    return (
      <>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
      </>
    )
  }
  
  export default AnecdoteList
