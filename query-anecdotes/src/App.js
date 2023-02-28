import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation } from 'react-query'
import { getAnecdotes, createAnecdote } from './requests'

const App = () => {
  const newAnecdoteMutation = useMutation(createNote)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content =
  }
  const handleVote = (anecdote) => {
    console.log('vote')
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
