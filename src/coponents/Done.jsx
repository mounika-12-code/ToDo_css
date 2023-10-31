/* eslint-disable no-undef */
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
          width: "60%",
          "@media screen and (max-width: 320px)": {
            width: "100%",
          },
          "@media screen and (max-width: 375px)": {
            width: "80%",
            // backgroundColor: 'aquamarine',
          },
          "@media screen and (max-width: 425px)": {
            width: "80%",
          },
          "@media screen and (max-width: 899px)": {
            width: "80%",
          },
          "@media screen and (max-width: 1024px)": {
            width: "75%",
          },
          "@media screen and (max-width: 1075px)": {
            width: "73%",
          },
        }}
      >
        <ul
          className='task-list'
          style={{display: "flex", flexDirection: "column"}}
        >
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              elevation={3}
              style={{listStyle: "none", textDecoration: "none"}}
            >
              <Box
                style={{
                  fontWeight: "bold",
                  textDecoration: task.complete ? "line-through" : "none",
                }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  // backgroundColor: 'rebeccapurple',
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
                    // justifyContent: 'center',
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
          width: "60%",
          "@media screen and (max-width: 320px)": {
            width: "100%",
            // height: '50%',
          },
          "@media screen and (max-width: 375px)": {
            width: "80%",
            // backgroundColor: 'aquamarine',
          },
          "@media screen and (max-width: 425px)": {
            width: "100%",
          },
          "@media screen and (max-width: 786px)": {
            width: "80%",
          },
        }}
      >
        <Button
          className='del_do_all btn'
          onClick={handleDeleteDoneTasks}
          variant='contained'
          color='primary'
          sx={{
            backgroundColor: "red",
            "@media screen and (max-width: 320px)": {
              width: "30%",
            },
            "@media screen and (max-width: 375px)": {
              width: "30%",
              fontSize: "10px",
            },
            "@media screen and (max-width: 425px)": {
              width: "40%",
              // marginLeft: '10px',
              // textAlign: 'center',
            },
            "@media screen and (max-width: 439px)": {
              width: "30%",
              height: "60px",
              // marginLeft: '10px',
              textAlign: "center",
              // lineheight: 1.2,
              // whitespace: 'pre - line',
              fontSize: "10px",
            },
            "@media screen and (max-width: 786px)": {
              width: "30%",
            },
            "@media screen and (max-width: 899px)": {
              width: "40%",
              height: "60px",
            },
          }}
        >
          Delete done tasks
        </Button>
        <Button
          className='del_all btn'
          onClick={handleDeleteAllTasks}
          variant='contained'
          color='secondary'
          sx={{
            backgroundColor: "red",
            "@media screen and (max-width: 320px)": {
              width: "30%",
            },
            "@media screen and (max-width: 375px)": {
              width: "30%",
              fontSize: "10px",
            },
            "@media screen and (max-width: 425px)": {
              width: "30%",
              fontSize: "10px",
            },
            "@media screen and (max-width: 786px)": {
              width: "30%",
            },
            "@media screen and (max-width: 899px)": {
              width: "40%",
              height: "60px",
            },
          }}
        >
          Delete all tasks
        </Button>
        {/* <button>submit</button> */}
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
