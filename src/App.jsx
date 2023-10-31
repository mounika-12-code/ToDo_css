import React, {useState} from "react"
import Done from "./coponents/Don"
import "./coponents/style.css"
import {Formik, Field, ErrorMessage, Form} from "formik"

// import * as Yup from "yup"
function App() {
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [taskText, setTaskText] = useState("")

  const [filterType, setFilterType] = useState("all")

  const handler = (values) => {
    console.log(values)
    if (values.taskText.trim() === "") {
      if (edit !== null) {
        const updatedTasks = tasks.map((task) =>
          task.id === edit ? {...task, text: values.taskText} : task,
        )
        setTasks(updatedTasks)
        setEdit(null)
        setTaskText("")
        // values.taskText = ""
      }
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        text: values.taskText,
        complete: false,
      }
      setTasks([...tasks, newTask])

      // setTaskText("")
      // console.log(setTaskText)
      values.taskText = ""
    }
  }

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleToggle = (id) => {
    console.log("Toggled task with id:", id)
    const updatedTasks = tasks.map((task) =>
      task.id === id ? {...task, complete: !task.complete} : task,
    )
    console.log("Updated tasks:", updatedTasks)
    setTasks(updatedTasks)
  }

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id)
    if (taskToEdit) {
      setTaskText(taskToEdit.text)
      setEdit(id)
      deleteTask(id)
    }
  }

  // const errors = {}
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

  return (
    <div className='App'>
      <h1> To-Do Input </h1>
      <div className='task-input'>
        <Formik
          initialValues={{taskText: taskText}}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log(values, "78 line")
            handler(values)
          }}
          validate={(values) => {
            console.log(values, "line no 79")
            let errors = {}
            if (values.taskText === "") {
              errors.taskText = "Enter text here..."
            }

            return errors
          }}
        >
          <Form>
            <Field
              id='taskText'
              className='input in'
              type='text'
              autoFocus
              placeholder='Enter your task...'
              name='taskText'
              // value={taskText}
              // onChange={(e) => setTaskText(e.target.value)}
            />
            <ErrorMessage
              name='taskText'
              component='div'
              className='error-message'
            />
            <button className='add_but' type='submit'>
              {edit !== null ? "Update Task" : "Add Task"}
            </button>
          </Form>
        </Formik>
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
