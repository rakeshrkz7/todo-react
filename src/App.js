import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // console.log("gedhh",input);

  // when the app loads, we need to listen to the database and fetch new todos as they added/removed
  useEffect(() => {
    //this code fires when the app.js
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc)=>doc.data().todo))
        setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo})))
        })
      }, []);
  const addTodo = (event) => {
    // this will fire when we click the button
    event.preventDefault(); // will stop refreshing

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]);
    setInput(""); // clearing the input field after hiting submit
  };

  return (
    <div className="App">
      <h1>📚 TODO LIST 📚</h1>

      <form>
        <FormControl>
          <InputLabel>✅Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
