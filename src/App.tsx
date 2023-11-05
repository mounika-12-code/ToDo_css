import React, { useState } from "react"
import Task from "./coponents/Task"
import {
  Container,
  TextField,
  Typography,
  Box,
  ButtonGroup,
  Button,
  FormControl,
} from "@mui/material"
import { useFormik } from "formik"

const App: React.FC = () => {
  type Task = {
    id: string
    matter: string
    completed: boolean
  }
  const [text, settext] = useState<string>("")
  const [filter, setfilter] = useState("all")
  const [edit, setediter] = useState<string>("")
  const [task, settask] = useState<Task[]>([])

  interface formValues {
    text: string
  }

  const formik = useFormik({
    initialValues: {
      text: text,
    },
    validate: (values: formValues) => {
      const errror: { [key: string]: string } = {}
      if (!values.text) {
        errror.text = "enter the task.."
      }
      return errror
    },
    onSubmit: (values: formValues) => {
      if (values.text.trim() !== "") {
        if (edit !== "") {
          const updatedTasks = task.map((task1) =>
            task1.id === edit ? { ...task1, matter: values.text } : task1
          )
          settask(updatedTasks)
          setediter("")
        } else {
          const newTask: Task = {
            id: crypto.randomUUID(),
            matter: values.text,
            completed: false,
          }
          settask([...task, newTask])
        }
      }
      values.text = ""
    },
  })

  function handletoggle(id: string) {
    const update = task.map((mapper) =>
      mapper.id == id ? { ...mapper, completed: !mapper.completed } : mapper
    )

    settask([...update])
  }
  const deleted = (id: string) => {
    const deletedtast = task.filter((mapper) => mapper.id !== id)
    settask([...deletedtast])
    console.log(id)
  }
  const editedtext = (id: string) => {
    const ediiter = task.find((i) => i.id === id)
    if (ediiter) {
      settext(ediiter.matter)
      setediter(id)
      formik.setValues({ ...formik.values, text: ediiter.matter })
    }
  }
  const filtering = task.filter((did) => {
    return (
      filter === "all" ||
      (filter === "do" && did.completed) ||
      (filter === "undo" && !did.completed)
    )
  })

  return (
    <Container
      sx={{
        width: { xs: "100%", md: "80%", lg: "80%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", margin: "15px 0px" }}>
        To-Do Input
      </Typography>
      <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: { xs: "90%", sm: "90%", md: "80%", lg: "80%", xl: "100%" },
        }}
      >
        <Box
          p={3}
          style={{ borderRadius: "5px" }}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            border: "1px solid black",
          }}
        >
          <TextField
            sx={{
              alignSelf: "center",
              // justifyItems: "center",
              marginBottom: "10px",
              width: { sm: "96%", xs: "85%", md: "93%" },
              // borderBlockColor: "black",
            }}
            value={formik.values.text}
            name="text"
            onChange={formik.handleChange}
            id="text"
            placeholder="enter the task.."
          />
          {formik.touched.text && formik.errors.text && (
            <Box
              sx={{
                marginLeft: "25px",
                color: "red",
                padding: "10px",
                fontSize: "large",
                // marginTop: "0px",
              }}
            >
              {formik.errors.text}
            </Box>
          )}
          <Button
            sx={{
              backgroundColor: "#16a3b7",
              alignSelf: "center",
              color: "white",
              "&:hover": {
                bgcolor: "#7be8f4",
              },
              width: { xs: "85%", sm: "96%", md: "94%" },
            }}
            type="submit"
          >
            Add Task
          </Button>
        </Box>
      </FormControl>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          margin: "20px 0px",
        }}
      >
        To - Do List
      </Typography>
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: { xs: "90%", sm: "85%", md: "94%" },
          marginBottom: "20px",
        }}
      >
        <Button
          variant="outlined"
          type="button"
          sx={{
            backgroundColor: "#16a3b7",

            color: "white",
            width: { xs: "30%", sm: "20%", md: "20%" },
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          onClick={() => setfilter("do")}
          style={{ borderRadius: "4px", border: "1px #16a3b7 solid" }}
        >
          do
        </Button>
        <Button
          sx={{
            backgroundColor: "#16a3b7",

            color: "white",
            width: { xs: "30%", sm: "20%", md: "20%" },
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          type="button"
          onClick={() => setfilter("undo")}
          style={{ borderRadius: "4px", border: "1px #16a3b7 solid" }}
        >
          undo
        </Button>
        <Button
          sx={{
            backgroundColor: "#16a3b7",

            color: "white",
            width: { xs: "30%", sm: "20%", md: "20%" },
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          type="button"
          onClick={() => setfilter("all")}
          style={{ borderRadius: "4px", border: "1px #16a3b7 solid" }}
        >
          all
        </Button>
      </ButtonGroup>
      <Task
        handletoggle={handletoggle}
        deleted={deleted}
        editedtext={editedtext}
        filtering={filtering}
        task={task}
        settask={settask}
      />
    </Container>
  )
}

export default App
