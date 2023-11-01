import React, {useState} from "react"

import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  TextField,
  Container,
  FormControl,
} from "@mui/material"
import Done from "./Done"
import {useFormik} from "formik"
function New() {
  const [tasks, setTasks] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [taskText, setTaskText] = useState("")
  const [edit, setEdit] = useState(null)
  const [filterType, setFilterType] = useState("all")

  const formik = useFormik({
    initialValues: {taskText: taskText},

    onSubmit: (values) => {
      console.log("shfjdsf", values)
      if (values.taskText.trim() !== "") {
        if (edit !== null) {
          const updatedTasks = tasks.map((task) =>
            task.id === edit
              ? {
                  ...task,
                  text: values.taskText,
                }
              : task,
          )
          setTasks(updatedTasks)
          setEdit(null)
        } else {
          const newTask = {
            id: crypto.randomUUID(),
            text: values.taskText,
            complete: false,
          }
          setTasks([...tasks, newTask])
        }
        values.taskText = ""
      }
    },
    validate: (values) => {
      let errors = {}
      if (!values.taskText) {
        errors.taskText = "Enter the task.. "
      }
      return errors
    },
  })
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

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleToggle = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            complete: !task.complete,
          }
        : task,
    )
    setTasks(updatedTasks)
  }

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id)
    if (taskToEdit) {
      setTaskText(taskToEdit.text)
      setEdit(id)
      formik.setValues({...formik.values, taskText: taskToEdit.text})
    }
  }

  return (
    <Container
      fixed
      sx={{
        width: {xs: "100%", md: "80%", lg: "80%"},
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      classes='Parent'
    >
      <Typography
        variant='h4'
        style={{textAlign: "center", margin: "15px 0px"}}
      >
        To - Do Input
      </Typography>

      <Box
        p={2}
        sx={{
          border: "1px solid #0b0e0f",
          width: {xs: "90%", sm: "80%", md: "80%", lg: "80%", xl: "100%"},
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl component='form' onSubmit={formik.handleSubmit}>
          <TextField
            onChange={formik.handleChange}
            value={formik.values.taskText}
            sx={{
              marginBottom: "20px",
              width: {sm: "92%", xs: "83%", md: "93%"},
              marginLeft: "20px",
              borderBlockColor: "#16a3b7",
            }}
            id='taskText'
            label='Enter Todo task'
            variant='outlined'
            name='taskText'
          />
          {formik.touched.taskText && formik.errors.taskText && (
            <Box sx={{marginLeft: "25px", color: "red", padding: "10px"}}>
              {" "}
              {formik.errors.taskText}
            </Box>
          )}

          <Button
            sx={{
              marginLeft: "20px",
              backgroundColor: "#16a3b7",
              marginRight: "15px",
              "&:hover": {
                bgcolor: "#7be8f4",
              },
              width: {xs: "85%", sm: "92%", md: "94%"},
            }}
            variant='contained'
            type='submit'
          >
            Add Task
          </Button>
        </FormControl>
      </Box>
      <Typography
        variant='h4'
        sx={{
          textAlign: "center",
          margin: "20px 0px",
        }}
      >
        To - Do List
      </Typography>

      <ButtonGroup
        variant='outlined'
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: {xs: "90%", sm: "85%", md: "94%"},
          marginBottom: "20px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#16a3b7",

            color: "white",
            width: {xs: "30%", sm: "20%", md: "20%"},
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          style={{borderRadius: "4px", border: "1px #16a3b7 solid"}}
          onClick={() => setFilterType("all")}
        >
          All
        </Button>

        <Button
          style={{borderRadius: "4px", border: "1px #16a3b7 solid"}}
          sx={{
            color: "white",
            backgroundColor: "#16a3b7",

            width: {xs: "30%", sm: "20%", md: "20%"},
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          onClick={() => setFilterType("do")}
        >
          Do
        </Button>
        <Button
          sx={{
            backgroundColor: "#16a3b7",
            borderRadius: "4px",
            color: "white",
            width: {xs: "30%", sm: "20%", md: "20%"},
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          style={{borderRadius: "4px", border: "1px #16a3b7 solid"}}
          onClick={() => setFilterType("undo")}
        >
          Undo
        </Button>
      </ButtonGroup>
      <Done
        filteredTasks={filteredTasks}
        handleToggle={handleToggle}
        deleteTask={deleteTask}
        handleEdit={handleEdit}
        setTasks={setTasks}
        tasks={tasks}
      />
    </Container>
  )
}

export default New
