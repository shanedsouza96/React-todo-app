import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import { Button, InputLabel, FormControl, Input } from '@material-ui/core'
import './App.css'
import db from './firebase'
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  //console.log(input)
  //when the app loads we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //This code here fires when the app loads
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data()))
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        )
        //setTodos(snapshot.docs.map((doc) => doc.data().todo))
      })
  }, [])

  const addTodo = (event) => {
    //This will fire off when we click the button
    event.preventDefault() //Will Stop Refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    //console.log('I am working!')
    setTodos([...todos, input])
    setInput('') //Clear up the input after hitting submit
    //console.log(todos)
  }

  return (
    <div className='App'>
      <h1 style={{ color: 'red' }}>Todo App 🚀</h1>

      <form style={{ textAlign: 'center' }}>
        <FormControl>
          <InputLabel>☑️ Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        {/* <button type='submit' onClick={addTodo}>Add Todo </button> */}
        <Button
          disabled={!input}
          type='submit'
          onClick={addTodo}
          variant='contained'
          color='primary'
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
          //<li>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
