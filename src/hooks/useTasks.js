import { useEffect, useState } from 'react'

const KEY = 'tugasku:tasks'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

// State management + persistence (localStorage) untuk CRUD tugas.
export default function useTasks() {
  const [tasks, setTasks] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (data) =>
    setTasks((t) => [
      { id: crypto.randomUUID(), done: false, createdAt: Date.now(), ...data },
      ...t,
    ])
  const updateTask = (id, data) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, ...data } : x)))
  const deleteTask = (id) => setTasks((t) => t.filter((x) => x.id !== id))
  const toggleTask = (id) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))

  return { tasks, addTask, updateTask, deleteTask, toggleTask }
}

