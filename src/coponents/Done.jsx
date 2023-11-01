import PropTypes from "prop-types"
import {Checkbox, Button, Box} from "@mui/material"
import {BiSolidPencil} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import React from "react"
function Done({
  filteredTasks,
  handleToggle,
  deleteTask,
  handleEdit,
  setTasks,
  tasks,
}) {
  const handleDeleteDoneTasks = () => {
    console.log("15line ")
    const updatedTasks = tasks.filter((task) => !task.complete)
    setTasks(updatedTasks)
  }

  const handleDeleteAllTasks = () => {
    setTasks([])
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: {xs: "100%", sm: "100%", md: "92%", lg: "90%"},
        }}
      >
        <ul
          className='task-list'
          style={{display: "flex", flexDirection: "column"}}
        >
          {filteredTasks.map((task) => (
            <li key={task.id} elevation={3} style={{listStyle: "none"}}>
              <Box
                style={{
                  fontWeight: "bold",
                  textDecoration: task.complete ? "line-through" : "none",
                }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px",
                  border: "1px black solid",
                  marginRight: "30px",
                }}
              >
                <Box
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "16px",
                  }}
                >
                  {task.text}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    style={{color: "green"}}
                    className='check'
                    checked={task.complete}
                    onChange={() => handleToggle(task.id)}
                  />
                  <AiFillDelete
                    className='delete'
                    style={{fontSize: "20px", color: "red"}}
                    // sx={{font}}
                    onClick={() => deleteTask(task.id)}
                  />
                  <BiSolidPencil
                    className='edit'
                    style={{fontSize: "20px", padding: "2px", color: "yellow"}}
                    onClick={() => handleEdit(task.id)}
                  />
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
      <Box
        className='two_but'
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: {
            xs: "80%",
            sm: "90%",
            md: "90%",
          },
          height: {md: "50px"},
        }}
      >
        <Button
          fontSize='20px'
          onClick={handleDeleteDoneTasks}
          variant='contained'
          sx={{
            backgroundColor: "red",
            width: {
              xs: "40%",
              sm: "40%",
              md: "30%",
            },
          }}
        >
          Delete done tasks
        </Button>
        <Button
          className='del_all btn'
          onClick={handleDeleteAllTasks}
          variant='contained'
          sx={{
            backgroundColor: "red",
            width: {
              xs: "40%",
              sm: "40%",
              md: "30%",
            },
          }}
        >
          Delete all tasks
        </Button>
      </Box>
    </>
  )
}

Done.propTypes = {
  deleteTask: PropTypes.func,
  filteredTasks: PropTypes.shape({
    map: PropTypes.func,
  }),
  handleEdit: PropTypes.func,
  handleToggle: PropTypes.func,
  setTasks: PropTypes.func,
  tasks: PropTypes.shape({
    filter: PropTypes.func,
  }),
}
export default Done
