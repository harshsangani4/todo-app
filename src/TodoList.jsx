import React from "react";

import { useState, useEffect } from "react";

export default function TodoApp(){
    const [tasks,setTasks] = useState(()=>{
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved):[];

    })


const [newTask,setNewTask] =useState("");

useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
},[tasks])

 const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

return (
    <div >
      <div >
        <h1>To-Do App</h1>

        {/* Input */}
        <div >
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul >
          {tasks.length === 0 && (
            <p >No tasks yet </p>
          )}

          {tasks.map((task) => (
            
            <li
              key={task.id}
             
            >
                <button
                onClick={() => toggleTask(task.id)}
                >
                    {task.completed ? "yes" : "no"}
                
                
              </button>
              {task.text}
              <button
                onClick={() => deleteTask(task.id)}
                
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}