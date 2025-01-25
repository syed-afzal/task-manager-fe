import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks, createTask, updateTask, deleteTask } from "../slices/taskSlice"
import type { RootState, AppDispatch } from "../store"
import TaskItem from "./TaskItem"
import CreateTaskForm from "./CreateTaskForm"
import { CheckList } from "../types"

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleCreateTask = (title: string, checklist:CheckList[]) => {
    dispatch(createTask({ title, checklist }))
    setShowCreateForm(false)
  }

  const handleUpdateTask = (id: string, title: string, checklist:CheckList[]) => {
    dispatch(updateTask({ id, title, checklist }))
  }

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))
  }

  return (
    <div className="bg-gray-900 text-white container mx-auto px-4 py-8 rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Task List</h1>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mb-4"
        onClick={() => setShowCreateForm(true)}
      >
        Create New Task
      </button>
      {showCreateForm && <CreateTaskForm onSubmit={handleCreateTask} onCancel={() => setShowCreateForm(false)} />}
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  )
}

export default TaskList
