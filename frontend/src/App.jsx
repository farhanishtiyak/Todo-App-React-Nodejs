
import { useState } from "react"
import { useEffect } from "react";
import { CreateTodo } from "./components/CreateTodo"
import { Todos } from "./components/Todos"

function App() {
  const [todos, setTodos] = useState([]);
  // Wrong way of doing backend call because infinite request will go
  // fetch("http://localhost:3000/todos")
  //   .then(async function (res) {
  //     const json = await res.json();
  //     console.log(json);
  //     setTodos(json.allTodos);
  // })

  // Right way to do it
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            const json = await response.json();
            setTodos(json.allTodos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    fetchData();
}, []); // Empty dependency array ensures the effect runs only once when component mounts



  return (
    <div>
      <CreateTodo></CreateTodo>
      <Todos todos={todos}></Todos>
    </div>
  )
}

export default App
