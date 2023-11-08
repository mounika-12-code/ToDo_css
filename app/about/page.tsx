'use client'
import { Box, Checkbox, Button, Typography, ButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Link from 'next/link'
type Task = {
  id: string
  matter: string
  completed: boolean
}

const TaskComponent: React.FC = () => {
  const storedText = localStorage.getItem('inputValue')
  const txt = storedText || ''
  const [text, settext] = useState<string>(txt)
  const [filter, setfilter] = useState('all')
  const [task, settask] = useState<Task[]>([])

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks)
      console.log('Tasks from localStorage:', parsedTasks)
      settask(parsedTasks)
    } else {
      settask([])
    }
  }, [])

  const del = () => {
    const updatedTasks = task.filter((t) => !t.completed)
    settask(updatedTasks)

    const completedTasks = task.filter((t) => t.completed)

    completedTasks.forEach((completedTask) => {
      localStorage.removeItem(completedTask.id)
      console.log(`Removed task with id ${completedTask.id} from localStorage`)
    })

    console.log(updatedTasks, 'Updated tasks')
    console.log(completedTasks, 'Completed tasks removed from localStorage')
  }

  const deleteall = () => {
    settask([])
    localStorage.clear()
  }
  console.log('Initial text:', text)
  console.log('Initial tasks:', task)
  function handletoggle(id: string) {
    const update = task.map((mapper) =>
      mapper.id == id ? { ...mapper, completed: !mapper.completed } : mapper
    )

    settask([...update])
  }
  const deleted = (id: string) => {
    const deletedtast = task.filter(
      (mapper: { id: string }) => mapper.id !== id
    )
    settask([...deletedtast])
    const delet = task.find((mapper: { id: string }) => mapper.id == id)
    localStorage.removeItem(delet!.id)
    console.log(id)
  }

  const filtering = task.filter((did) => {
    console.log('filtered task', did)

    return (
      (did.matter && filter === 'all') ||
      (filter === 'do' && !did.completed) ||
      (filter === 'undo' && did.completed)
    )
  })
  // console.log("Filtered tasks:", filtering);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        flexDirection: 'column',
        width: { xs: '100%', sm: '100%', md: '92%', lg: '90%' },
      }}
    >
      <Button
        style={{ backgroundColor: 'red' }}
        sx={{ textDecoration: 'none', width: '60px' }}
      >
        <Link
          style={{ color: 'white', textDecoration: 'none' }}
          href={{ pathname: '/' }}
        >
          HOME
        </Link>
      </Button>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          margin: '20px 0px',
        }}
      >
        To - Do List
      </Typography>
      <ButtonGroup
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: { xs: '90%', sm: '85%', md: '94%' },
          marginBottom: '20px',
        }}
      >
        <Button
          variant="outlined"
          type="button"
          sx={{
            backgroundColor: '#16a3b7',

            color: 'white',
            width: { xs: '30%', sm: '20%', md: '20%' },
            '&:hover': {
              bgcolor: '#7be8f4',
            },
          }}
          onClick={() => setfilter('do')}
          style={{ borderRadius: '4px', border: '1px #16a3b7 solid' }}
        >
          Todo
        </Button>
        <Button
          sx={{
            backgroundColor: '#16a3b7',

            color: 'white',
            width: { xs: '30%', sm: '20%', md: '20%' },
            '&:hover': {
              bgcolor: '#7be8f4',
            },
          }}
          type="button"
          onClick={() => setfilter('undo')}
          style={{ borderRadius: '4px', border: '1px #16a3b7 solid' }}
        >
          Done
        </Button>
        <Button
          sx={{
            backgroundColor: '#16a3b7',

            color: 'white',
            width: { xs: '30%', sm: '20%', md: '20%' },
            '&:hover': {
              bgcolor: '#7be8f4',
            },
          }}
          type="button"
          onClick={() => setfilter('all')}
          style={{ borderRadius: '4px', border: '1px #16a3b7 solid' }}
        >
          all
        </Button>
      </ButtonGroup>
      {filtering?.map((t) => (
        <Box key={t.id}>
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px black solid',
              borderRadius: '4px',
            }}
          >
            <li key={t.id} style={{ listStyle: 'none' }}>
              <Box
                style={{
                  textDecoration: t.completed ? 'line-through' : 'none',
                  color: t.completed ? 'red' : 'black',
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '10px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '5px 0px',
                  width: { xs: '100%' },
                  fontWeight: 'bold',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '16px',
                  }}
                >
                  {t.matter}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px',
                  }}
                >
                  <Checkbox
                    style={{ color: 'green' }}
                    checked={t.completed}
                    onChange={() => handletoggle(t.id)}
                  />
                  <AiFillDelete
                    style={{ fontSize: '20px', color: 'red' }}
                    type="button"
                    onClick={() => deleted(t.id)}
                  />
                  <Link
                    href={{
                      pathname: '/',
                      query: { id: t.id, name: t.matter },
                    }}
                  >
                    <BiSolidPencil
                      style={{
                        fontSize: '20px',
                        padding: '2px',
                        color: 'yellow',
                      }}
                      type="button"
                      // onClick={() => editedtext(t.id)}
                    />
                  </Link>
                </Box>
              </Box>
            </li>
          </ul>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-evenly',
          width: {
            xs: '80%',
            sm: '90%',
            md: '90%',
          },
        }}
      >
        <Button
          sx={{
            backgroundColor: 'red',
            height: '30%',

            color: 'white',
            marginBottom: { xs: '10px' },
            width: {
              xs: '100%',
              sm: '40%',
              md: '30%',
            },
            '&:hover': {
              bgcolor: '#7be8f4',
            },
          }}
          type="button"
          onClick={del}
        >
          delete checked
        </Button>
        <Button
          sx={{
            backgroundColor: 'red',
            height: '30%',

            color: 'white',
            width: {
              xs: '100%',
              sm: '40%',
              md: '30%',
            },
            '&:hover': {
              bgcolor: '#7be8f4',
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
