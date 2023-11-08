'use client'
import React, { useEffect, useState } from 'react'
import {
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
} from '@mui/material'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
type Task = {
  id: string
  matter: string
  completed: boolean
}

export default function Page() {
  const search = useSearchParams()
  const routerId = search.get('id')
  const initialName = search.get('name')
  const storedText = localStorage.getItem('inputValue')
  const value = storedText || ''
  const [text, setText] = useState<string>(value)

  const storedTasks = localStorage.getItem('tasks')
  const array = storedTasks ? JSON.parse(storedTasks) : []
  const [tasks, setTasks] = useState<Task[]>(array)
  const isLocalStorageAvailable =
    typeof window !== 'undefined' && window.localStorage

  useEffect(() => {
    if (initialName) {
      setText(initialName)
    }
  }, [initialName])

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('inputValue', text)
    }
  }, [text])
  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (routerId) {
      const updatedTasks: Task[] = tasks.map((task) => {
        if (task.id === routerId) {
          return {
            ...task,
            matter: text,
          }
        }
        return task
      })

      setTasks(updatedTasks)
      if (isLocalStorageAvailable) {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      }
    } else {
      if (text.trim() !== '') {
        const newTask: Task = {
          id: crypto.randomUUID(),
          matter: text,
          completed: false,
        }

        const updatedTasks: Task[] = [...tasks, newTask]
        setTasks(updatedTasks)
        if (isLocalStorageAvailable) {
          localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        }
        setText('')
      }
    }
  }

  return (
    <Container
      sx={{
        width: { xs: '100%', md: '80%', lg: '80%' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', marginY: '15px' }}>
        To-Do Input
      </Typography>
      <FormControl
        component="form"
        onSubmit={handleAdd}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: { xs: '90%', sm: '90%', md: '80%', lg: '80%' },
        }}
      >
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="text"
          label="Enter the task.."
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          // color="primary"
          onClick={handleAdd}
          // style={{width:"70%"}}
          sx={{
            width: '100%',
            marginTop: '10px',
            height: '50px',
            backgroundColor: 'red',
            '&:hover': {
              bgcolor: '#7be8f4',
            },
          }}
        >
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            href={{ pathname: '/about', query: { text } }}
            passHref
          >
            Add Task
          </Link>
        </Button>
      </FormControl>
    </Container>
  )
}
