import { useEffect, useState } from "react";
import "./App.css";
import NewTodoForm from "./NewTodoForm";

function App() {
  const [todos,setTodos] = useState(()=>{
    const localvalue = localStorage.getItem('ITEMS');

    if (localvalue == null) return [];

    return JSON.parse(localvalue);
  })

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos]);

  
  const  addTodo = (title) => {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: title,
          completed: false,
        },
      ];
    });
  }



  const toggleTodo = (id , completed) =>{
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return {...todo, completed}
        }
        return todo;
      })
    })
  }


  const deleteTodo = (id ) =>{
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }




  return (
    <div className="container">
      <h1>TODO APP</h1>
      <NewTodoForm onSubmit = {addTodo}/>
      <div className="todo-list">
        <h2>Todo List</h2>
        <ul>
          {todos.length === 0 && 'No tasks'}
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <label htmlFor="">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                  />
                  {todo.title}
                </label>
                <button
                  className="btn-delete"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
