import { useState, useEffect } from "react";
import {nanoid} from "nanoid";
import Create from "./components/Create";



function App() {
    
  const [todos,settodos] = useState([])
  const styforBtn = {color: 'white', fontSize: '1.5rem', borderColor: "yellow",fontWeight: '600', borderRadius: '5px', backgroundColor: 'black', width: '10rem', height: '3rem',}

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      settodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Create todos={todos} settodos={settodos} styforBtn={styforBtn} />
    </>
  )
}

export default App
