import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const numberRandom = Math.random()

    const titleTask = newTaskTitle

    if (!titleTask.trim()) {
      return alert("Complete com o nome da tarefa.")
    }

    const newTask = {
      id: numberRandom,
      title: titleTask,
      isComplete: false
    }

    setTasks(previous => [...previous, newTask])
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskCapturation = tasks.filter(task => task.id === id)
    const taskDelete = taskCapturation[0]
    taskCapturation[0].isComplete = !taskCapturation[0].isComplete

    setTasks(task => {
      task.splice(task.indexOf(taskDelete), 1, taskCapturation[0])
      return [...task]
    })
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const taskDelete = tasks.filter(task => task.id === id)

    setTasks(ask => {

      ask.splice(ask.indexOf(taskDelete[0]), 1)
      return [...ask]
    })
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id} id={`${task.id}`}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}