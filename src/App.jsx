import React, {useState} from "react"
import Done from "./coponents/Don"
import "./coponents/style.css"
function App() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState("")
  const [edit, setEdit] = useState(null)
  const [filterType, setFilterType] = useState("all")
  const [error, seterror] = useState("")
  const filteredTasks = tasks.filter((task) => {
    if (filterType === "all") {
      return true
    } else if (filterType === "do") {
      return task.complete
    } else if (filterType === "undo") {
      return !task.complete
    }
    return true
  })

  const addTask = () => {
    if (taskText.trim() === "") {
      seterror("Please enter text here...")
    } else {
      seterror("")
      if (edit !== null) {
        const updatedTasks = tasks.map((task) =>
          task.id === edit ? {...task, text: taskText} : task,
        )
        setTasks(updatedTasks)
        setEdit(null)
      } else {
        // seterror("")
        const newTask = {
          id: tasks.length,
          text: taskText,
          complete: false,
        }
        setTasks([...tasks, newTask])
      }

      setTaskText("")
    }
  }

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleToggle = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? {...task, complete: !task.complete} : task,
    )
    setTasks(updatedTasks)
  }

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id)
    if (taskToEdit) {
      setTaskText(taskToEdit.text)
      setEdit(id)
    }
  }

  return (
    <div className='App'>
      <h1> To-Do Input </h1>
      <div className='task-input'>
        <input
          className='input in'
          type='text'
          autoFocus='autofocus'
          placeholder='Enter your task...'
          value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value)
            seterror("")
          }}
        />
        {error && (
          <div className='error-message' style={{color: "red", margin: "10px"}}>
            {error}
          </div>
        )}
        <button className='add_but' onClick={addTask}>
          {edit !== null ? "Update Task" : "Add Task"}
        </button>
      </div>
      <h2>To-Do List</h2>
      <div className='three_but'>
        <button className='one but' onClick={() => setFilterType("all")}>
          All
        </button>
        <button className='two but' onClick={() => setFilterType("do")}>
          Do
        </button>
        <button className='three but' onClick={() => setFilterType("undo")}>
          Undo
        </button>
      </div>
      <Done
        filteredTasks={filteredTasks}
        handleToggle={handleToggle}
        deleteTask={deleteTask}
        handleEdit={handleEdit}
        setTasks={setTasks}
        tasks={tasks}
      />
    </div>
  )
}

export default App
