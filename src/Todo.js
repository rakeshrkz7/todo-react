import React, { useState } from 'react';
import './Todo.css';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, ListItem, ListItemAvatar, Modal, Button } from '@material-ui/core'
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () =>{
        setOpen(true);
    }

    const updateTodo = () => {
        // update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true});

        setOpen(false);
    }

    return (
        <>
        <Modal
            open= {open}
            onClose= {e => setOpen(false)}
        >
            <div class = {classes.paper}>
                <form>
                <h1>Edit</h1>
                <input placeholder = {props.todo.todo}  value = {input} onChange = {event => setInput(event.target.value)}/>
                <Button type= 'submit' onClick={updateTodo}>UPDATE TODO</Button>
                </form>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary='Dummy deadline ⏲'/>
            </ListItem>
            <button onClick={e => setOpen(true)}>Edit</button>
            <DeleteForeverIcon onClick={event => {
                db.collection('todos').doc(props.todo.id).delete()
            }}/>
        </List>
        </>
    );
}

export default Todo
