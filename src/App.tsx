import { useEffect, useState } from "react"
import MatrixRain from './MatrixRain';
import "./styles.css"

export default function App(){
  const [newItem, setNewItem] = useState<string>("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todo, setTodo] = useState<Array<any>>([])

  function handleSubmit(e: { preventDefault: () => void }){
    e.preventDefault()

    if (newItem === ""){
      return
    }

    setTodo(currentTodo => {
      return [
        ...currentTodo,
        { id: crypto.randomUUID(), title: newItem, completed: false},
      ]
    })

    setNewItem("")
  }

  function toggleTodo(id: number, completed: boolean){
    setTodo(currentTodo => {
      return currentTodo.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id: number){
    setTodo(currentTodo => {
      return currentTodo.filter(todo => todo.id !== id)
    })
  }

  useEffect(() => {
    const checkLocalStorage = localStorage.getItem("Items")
      if(checkLocalStorage && checkLocalStorage?.length > 0){
        setTodo(JSON.parse(typeof(checkLocalStorage) === "string" ? checkLocalStorage : JSON.stringify([])))
      }
    }, [])

   useEffect(() => {
    if(todo.length > 0){
        localStorage.setItem("Items", JSON.stringify(todo))
     }
    }, [todo])

  return (
    <>
      <div className=" canvas#matrix-canvas">
        <MatrixRain></MatrixRain>
        <div className="grid">
          <form onSubmit={handleSubmit} className="new-item-form">   
            <div className="form-row">
              <label className="label-text" htmlFor="item"></label>
              <h1>What do you need to do?</h1>
              <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item"></input>
            </div>
            <button className="btn">Add</button>
          </form>
          <h2 className="label-text">Todo List</h2>
          <ul className="list">
            {todo.map(todo => { 
              return (
              <li key={todo.id}>
              <label>
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                ></input>
                <span className="strike-through">{todo.title}</span>
              </label>
              <button 
                onClick={() =>deleteTodo(todo.id)} 
                className="btn btn-danger">
                  Delete
              </button>
            </li>
            )
            })}
          </ul>
        </div>
      </div>
  </>
  )
}
