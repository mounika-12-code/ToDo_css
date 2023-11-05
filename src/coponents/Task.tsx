import { Box, Checkbox, Button } from "@mui/material"
import React from "react"
import { BiSolidPencil } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
// import { Task } from "../App"
type Task = {
  id: string
  matter: string
  completed: boolean
}

interface Props {
  handletoggle: (id: string) => void
  deleted: (id: string) => void
  editedtext: (id: string) => void
  filtering: Task[]
  task: Task[]
  settask: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskComponent: React.FC<Props> = ({
  handletoggle,
  deleted,
  editedtext,
  filtering,
  task,
  settask,
}) => {
  const del = () => {
    const updatedTasks = task.filter((t) => !t.completed)
    settask(updatedTasks)
  }

  const deleteall = () => {
    settask([])
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        flexDirection: "column",
        width: { xs: "100%", sm: "100%", md: "92%", lg: "90%" },
      }}
    >
      {filtering.map((t) => (
        <Box key={t.id}>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px black solid",
              borderRadius: "4px",
            }}
          >
            <li key={t.id} style={{ listStyle: "none" }}>
              <Box
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  color: t.completed ? "red" : "black",
                }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "5px 0px",
                  width: { xs: "100%" },
                  fontWeight: "bold",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "16px",
                  }}
                >
                  {t.matter}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <Checkbox
                    style={{ color: "green" }}
                    checked={t.completed}
                    onChange={() => handletoggle(t.id)}
                  />
                  <AiFillDelete
                    style={{ fontSize: "20px", color: "red" }}
                    type="button"
                    onClick={() => deleted(t.id)}
                  />
                  <BiSolidPencil
                    style={{
                      fontSize: "20px",
                      padding: "2px",
                      color: "yellow",
                    }}
                    type="button"
                    onClick={() => editedtext(t.id)}
                  />
                </Box>
              </Box>
            </li>
          </ul>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-evenly",
          width: {
            xs: "80%",
            sm: "90%",
            md: "90%",
          },
        }}
      >
        <Button
          sx={{
            backgroundColor: "red",
            height: "30%",

            color: "white",
            marginBottom: { xs: "10px" },
            width: {
              xs: "100%",
              sm: "40%",
              md: "30%",
            },
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          type="button"
          onClick={del}
        >
          delete checked
        </Button>
        <Button
          sx={{
            backgroundColor: "red",
            height: "30%",

            color: "white",
            width: {
              xs: "100%",
              sm: "40%",
              md: "30%",
            },
            "&:hover": {
              bgcolor: "#7be8f4",
            },
          }}
          type="button"
          onClick={deleteall}
        >
          delete all
        </Button>
      </Box>
    </Box>
  )
}

export default TaskComponent
