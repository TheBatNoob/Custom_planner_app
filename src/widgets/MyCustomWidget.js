import React, { useEffect, useState } from 'react';

export default function MyCustomWidget() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Calculate progress percentage
  const progress = tasks.length > 0 ? ((completedTasks.length / tasks.length) * 100).toFixed(2) : 0;

  // Update completed tasks whenever tasks change
  useEffect(() => {
    const completed = tasks.filter(task => task.completed);
    setCompletedTasks(completed);
  }, [tasks]);

  // Function to handle task completion
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to clear tasks
  const clearTasks = () => {
    setTasks([]);
  };
    
  // Function to add a new task
  const addTask = (taskName) => {
    const newTask = { id: Date.now(), name: taskName, completed: false };
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
    <div>
      <h3>Tasks</h3> 
      {tasks.length > 0 && (
          <button className="complete-button" onClick={clearTasks} style={{ float: 'right'}}>Clear Tasks</button>
      )}
    <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <span>{task.name}</span>
              {!task.completed ? (
                  <button className="complete-button" onClick={() => handleTaskCompletion(task.id)}>Completed</button>
              ) : (
                <span className="completed-task">&#10004;</span>
              )}
            </li>
          ))}
        </ul>
        
      <input
        type="text"
        placeholder="Add a new task"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            addTask(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>

    <div>
      <h3>Progress: {progress}%</h3>
      <div style={{ minWidth: 300, height: '20px', backgroundColor: '#ccc' }}>
        <div style={{ width: `${progress}%`, height: '20px', backgroundColor: '#03AC13' }}></div>
      </div>
    </div>

    <style jsx>{`
      .complete-button {
        background-color: #757575;
        border-radius: 5px;
        border: none;
        color: white;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin-left: 10px;
        cursor: pointer;
      }
      
      li {
        margin-bottom: 5px;
      }
    `}</style>
  </div>
  );
}
