import { useState } from "react"
import "./style.css"

export default function App(){
  const [newItem, setNewItem] = useState("");

  const [todos, setTodos] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    setTodos((currentTodo => {
      return[
        ...currentTodo, {id: crypto.randomUUID(), title: newItem, completed:false},
      ]
    }))
    setNewItem("");
  }

  function handleDeletion(id){
    const remArr = todos.filter((element)=> element.id != id);
    setTodos(remArr);
  }

  function handleCheckbox(id, completed){
    console.log("Checkbox ID:", id, "Checked State:", completed);
    const checkedArr = todos.map((element)=> {
      if(element.id==id){
        return {...element, completed};
      }
      return element;
    })
    setTodos(checkedArr);
    console.log("Updated Todos:", checkedArr);
  }

  return (
    <>
      <form onSubmit = {handleSubmit} className  = "new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input 
          value = {newItem} 
          onChange= {(e)=> setNewItem(e.target.value)} 
          type = "text" id = "item" />
      </div>
      <button className = "btn">Add</button>
      </form>
      <h1 className="header">ToDo List</h1>
      <ul className = "list">
        { todos.length === 0 && "No Todos"}
        {todos.map((element) => {
          return (
            <li key={element.id}>
            <label>
              <input type = "checkbox" 

              checked = {element.completed} 

              onChange={
                (e)=> {handleCheckbox(element.id, e.target.checked)}
              }></input>

              {element.title}
            </label>
            <button onClick={(e)=> handleDeletion(element.id)} className = "btn btn-danger">Delete</button>
            </li>
          )
        }
        )}
      </ul>

    </>
  )
}
