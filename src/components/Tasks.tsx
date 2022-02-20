import "../styles/tasks.scss"
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel } from "@mui/material";
import { useCallback, useState } from "react";


interface Task  {
  id: number;
  title: string;
  isComplete: boolean;
}

export function Tasks() {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks ] = useState<Task[]>([])
  const updateTask = useCallback((index, task) => {
    tasks.splice(index,1)
    setTasks([...tasks, {
      id: task.id,
      title: task.title,
      isComplete: !task.isComplete
    }])
  },[tasks])
  const deleteTask = useCallback((index) => {
    tasks.splice(index,1)
    setTasks([...tasks])
  }, [tasks]) 
  return (
    <>
      <div className="main-container">
        <div className="background-header">
          <h3>To.do</h3>
        </div>
        <div className="card-container">
          <h3 className="title-container">Minhas Tasks</h3>
          <div className="add-task-container">
            <input type="text" onChange={(ev) => setNewTask(ev.target.value)} value={newTask}/>
            <button disabled={!Boolean(newTask.length)} onClick={() => {
              setTasks([...tasks, {
                title: newTask,
                isComplete: false,
                id: tasks.length + 1
              }])
              setNewTask("")
            }}>Nova Tarefa +</button>
          </div>
          <div className="list-task-container">
            <ul>
              <li>
                {tasks.map((task: Task , index: number) => (
                  <>
                    <div>
                      <FormControlLabel 
                      control={<Checkbox checked={task.isComplete} 
                      onClick={() => updateTask(index, task)} />} label={task.title} />
                       <Button variant="outlined" color="error" onClick={() => deleteTask(index)} className="button-delete-task">
                        X
                      </Button>
                    </div>
                  </>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}