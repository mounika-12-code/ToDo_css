import React, {useState} from "react"
import {Box, TextField, Button, ButtonGroup, Typography} from "@mui/material"
import Done from "./Done"
import {Container} from "@mui/system"
// import styles from './material.module.css'

function New() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState("")
  const [edit, setEdit] = useState(null)
  const [filterType, setFilterType] = useState("all")

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
    if (taskText.trim() !== "") {
      if (edit !== null) {
        const updatedTasks = tasks.map((task) =>
          task.id === edit
            ? {
                ...task,
                text: taskText,
              }
            : task,
        )
        setTasks(updatedTasks)
        setEdit(null)
      } else {
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
    }
  }

  return (
    <Container
      fixed
      // maxWidth='xl'
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // backgroundColor: 'red',
        flexWrap: "wrap",
        "@media screen and (max-width: 320px)": {
          width: "100%",
          // backgroundColor: 'aquamarine',
        },
      }}
      classes='Parent'
    >
      <Typography variant='h1' style={{textAlign: "center"}}>
        To - Do Input
      </Typography>

      <Box
        p={2}
        sx={{
          border: "1px solid #0b0e0f",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          "@media screen and (max-width: 320px)": {
            width: "80%",
            // backgroundColor: 'red',
          },
          "@media screen and (max-width: 375px)": {
            width: "70%",
            // backgroundColor: 'aquamarine',
          },
          "@media screen and (max-width: 425px)": {
            width: "80%",
          },
          "@media screen and (max-width: 440px)": {
            width: "80%",
          },
          "@media screen and (max-width: 899px)": {
            width: "80%",
          },
          "@media screen and (max-width: 1075px)": {
            width: "60%",
          },
          "@media screen and (max-width: 2560px)": {
            width: "60%",
          },
        }}
      >
        <TextField
          sx={{
            marginBottom: "20px",
            width: "92%",
            marginLeft: "20px",
            borderBlockColor: "#16a3b7",
            "@media screen and (max-width: 375px)": {
              width: "85%",
              // backgroundColor: 'aquamarine',
            },
            "@media screen and (max-width: 425px)": {
              width: "87%",
            },
            "@media screen and (max-width: 440px)": {
              width: "87%",
            },
          }}
          label='Enter Todo task'
          variant='outlined'
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          // style={{marginBottom: '30px', marginLeft: '10px'}}
        />
        <Button
          sx={{
            marginLeft: "20px",
            backgroundColor: "#16a3b7",
            marginRight: "15px",
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          variant='contained'
          onClick={addTask}
        >
          Add Task
        </Button>
      </Box>
      <h2> To - Do List </h2>
      <ButtonGroup
        variant='outlined'
        aria-label='outlined button group'
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "60%",
          marginBottom: "20px",
          "@media screen and (max-width: 320px)": {
            width: "100%",
          },
          "@media screen and (max-width: 338px)": {
            width: "100%",
            // justifyContent: 'space-around',
          },
          "@media screen and (max-width: 375px)": {
            width: "100%",
          },
          "@media screen and (max-width: 425px)": {
            width: "80%",
          },
          "@media screen and (max-width: 364px)": {
            width: "100%",
          },
          "@media screen and (max-width: 482px)": {
            width: "90%",
          },
          "@media screen and (max-width: 899px)": {
            width: "80%",
          },
        }}
      >
        <Button
          sx={{
            backgroundColor: "#16a3b7",

            color: "white",
            width: "80px",
            "&:hover": {
              bgcolor: "#7be8f4",
            },
            "@media screen and (max-width: 320px)": {
              width: "30%",
            },
            "@media screen and (max-width: 321px)": {
              width: "30%",
            },
            "@media screen and (max-width: 338px)": {
              width: "30%",
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

            width: "80px",
            "&:hover": {
              bgcolor: "#7be8f4",
            },
            "@media screen and (max-width: 320px)": {
              width: "30%",
            },
            "@media screen and (max-width: 321px)": {
              width: "30%",
            },
            "@media screen and (max-width: 338px)": {
              width: "30%",
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
            width: "80px",
            "&:hover": {
              bgcolor: "#7be8f4",
            },
            "@media screen and (max-width: 320px)": {
              width: "30%",
            },
            "@media screen and (max-width: 321px)": {
              width: "30%",
            },
            "@media screen and (max-width: 338px)": {
              width: "30%",
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
