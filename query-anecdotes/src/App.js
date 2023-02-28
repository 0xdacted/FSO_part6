import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation} from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      dispatch({ type: 'SHOW_NOTIFICATION',
                 payload: `Voted ${updatedAnecdote.content}` })
      queryClient.setQueryData('anecdotes', (oldAnecdotes) => {
        const newAnecdotes = oldAnecdotes.map((anecdote) => {
          if (anecdote.id === updatedAnecdote.id) {
            return { ...anecdote, ...updatedAnecdote}
          }
          return anecdote
        })
        return newAnecdotes
      })
    }
  })
  const handleVote = (anecdote) => {
    console.log(anecdote)
    const updateAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(updateAnecdote)

  }

  const { isLoading, error, data: anecdotes} = useQuery(
    'anecdotes',
    () => getAnecdotes()
  )

  if ( isLoading ) {
    return <div> loading data... </div>
  }

  if (error) {
    return <div>Error: {error.message} </div>
  }
  

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
