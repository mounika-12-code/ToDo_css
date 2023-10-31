import React, {useState} from "react"
import {useFormik} from "formik"
import * as Yup from "yup"
import Nothing from "./Nothing"

function App() {
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState(null)
  const [filterType, setFilterType] = useState("all")
  const [, setError] = useState("")

  const validationSchema = Yup.object().shape({
    taskText: Yup.string().required("Please enter your task."),
  })

  const formik = useFormik({
    initialValues: {
      taskText: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      if (values.taskText.trim() === "") {
        setError("Please enter text here...")
      } else {
        setError("")
        if (edit !== null) {
          const updatedTasks = tasks.map((task) =>
            task.id === edit ? {...task, text: values.taskText} : task,
          )
          setTasks(updatedTasks)
          setEdit(null)
        } else {
          const newTask = {
            id: tasks.length,
            text: values.taskText,
            complete: false,
          }
          setTasks([...tasks, newTask])
        }

        resetForm()
      }
    },
  })

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
      formik.setFieldValue("taskText", taskToEdit.text) // Update formik state directly
      setEdit(id)
    }
  }

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
      <h1>To-Do Input</h1>
      <div className='task-input'>
        <form onSubmit={formik.handleSubmit}>
          <input
            className='input in'
            type='text'
            autoFocus='autofocus'
            placeholder='Enter your task...'
            name='taskText'
            value={formik.values.taskText}
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
          />
          {formik.touched.taskText && formik.errors.taskText && (
            <div className='error-message'>{formik.errors.taskText}</div>
          )}
          <button className='add_but' type='submit'>
            Add Task
          </button>
        </form>
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
      <Nothing
        filteredTasks={filteredTasks}
        handleToggle={handleToggle}
        deleteTask={deleteTask}
        tasks={tasks}
        setTasks={setTasks}
        handleEdit={handleEdit}
      />
    </div>
  )
}

export default App
