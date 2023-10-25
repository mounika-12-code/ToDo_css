/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import {BiSolidPencil} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"

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
      <div>
        <ul className='task-list'>
          {filteredTasks.map((task) => (
            <div key={task.id} className='Don_all'>
              <div
                className='list'
                style={{
                  textDecoration: task.complete ? "line-through" : "none",
                }}
              >
                {task.text}
              </div>
              <div className='Allthree_but'>
                <input
                  className='check'
                  type='checkbox'
                  checked={task.complete}
                  onChange={() => handleToggle(task.id)}
                />

                <AiFillDelete
                  className='delete'
                  onClick={() => deleteTask(task.id)}
                />
                <BiSolidPencil
                  className='edit'
                  onClick={() => handleEdit(task.id)}
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

export default Done
