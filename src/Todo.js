import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Modal,
} from '@material-ui/core'
import './Todo.css'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #0000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function Todo(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const updateTodo = () => {
    //update the todo with the new input text
    db.collection('todos').doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    ) //this will append
    setOpen(false)
  }

  return (
    <section className='To'>
      <>
        <Modal open={open} onClose={handleClose}>
          <div className={classes.paper}>
            <h2>Edit your existing Todo</h2>
            <input
              placeholder={props.todo.todo}
              value={input} //locked the input
              onChange={(event) => setInput(event.target.value)}
            />
            <Button onClick={updateTodo}>🔺 Update Todo</Button>
          </div>
        </Modal>
        <List className='todo__list'>
          <ListItem>
            <ListItemAvatar></ListItemAvatar>
            <ListItemText
              style={{ paddingLeft: 530 }}
              primary={props.todo.todo}
              secondary='Dummy Deadline ⏰'
            />
            {/*<li>{props.text}</li>*/}
          </ListItem>
          <button onClick={(e) => setOpen(true)} style={{ marginRight: 10 }}>
            📝 Edit Todo
          </button>
          <button
            onClick={(event) =>
              db.collection('todos').doc(props.todo.id).delete()
            }
          >
            ✖️ Delete Todo{' '}
          </button>
        </List>
      </>
    </section>
  )
}

export default Todo
