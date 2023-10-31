/* eslint-disable react/prop-types */
import React, {useState} from "react"
import {BiSolidPencil} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"

export default function Dones({
  filteredTasks,
  handleToggle,
  deleteTask,
  tasks,
  setTasks,
  handleEdit,
}) {
  const [editedTask, setEditedTask] = useState(null)

  // eslint-disable-next-line no-unused-vars
  const handleEditClick = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? {...task, text: newText} : task,
    )
    setTasks(updatedTasks)
    setEditedTask(null)
  }

  const handleDeleteDoneTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.complete)
    setTasks(updatedTasks)
  }

  const handleDeleteAllTasks = () => {
    setTasks([])
  }

  return (
    <>
      <div>
        <ul className='task-list'>
          {filteredTasks.map((task) => (
            <div key={task.id} className='Don_all'>
              <div className='list'>
                {editedTask && editedTask.id === task.id ? (
                  <div className='edit-task'>{editedTask.text}</div>
                ) : (
                  <div
                    className='list'
                    style={{
                      textDecoration: task.complete ? "line-through" : "none",
                      color: task.complete ? "red" : "black",
                    }}
                  >
                    {task.text}
                  </div>
                )}
              </div>
              <div className='Allthree_but'>
                <input
                  className='check'
                  type='checkbox'
                  checked={task.complete}
                  onChange={() => handleToggle(task.id)}
                />
                <BiSolidPencil
                  className='edit'
                  onClick={() => handleEdit(task.id, task.text)}
                />
                <AiFillDelete
                  className='delete'
                  onClick={() => deleteTask(task.id)}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className='two_but'>
        <button className='del_do_all btn' onClick={handleDeleteDoneTasks}>
          Delete done tasks
        </button>
        <button className='del_all btn' onClick={handleDeleteAllTasks}>
          Delete all tasks
        </button>
      </div>
    </>
  )
}
