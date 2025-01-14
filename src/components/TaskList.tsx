import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTask, updateTaskPriority, setFilter } from '../store/slices/tasksSlice';
import type { RootState } from '../store';
import { Trash2, Circle, CheckCircle } from 'lucide-react';

const TaskList = () => {
  const { tasks, filter, searchQuery } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'low':
        return 'text-green-400 bg-green-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true;
    })
    .filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-[#25262b] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">Task Progress</h2>
            <p className="text-sm text-gray-400">{completedTasks} of {totalTasks} tasks completed</p>
          </div>
          <div className="text-2xl font-bold text-green-500">{completionPercentage}%</div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => dispatch(setFilter('all'))}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'all' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter('active'))}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'active' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => dispatch(setFilter('completed'))}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'completed' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="space-y-1">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No tasks found</p>
        ) : (
          <ul className="space-y-1">
            {filteredTasks.map((task) => (
              <li key={task.id} className="group bg-[#25262b] hover:bg-[#2c2d32] rounded-lg">
                <div className="flex items-center px-4 py-3">
                  <button
                    onClick={() => dispatch(toggleTask(task.id))}
                    className="flex-shrink-0 focus:outline-none"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0 ml-3">
                    <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                      {task.title}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <select
                      value={task.priority}
                      onChange={(e) => dispatch(updateTaskPriority({ id: task.id, priority: e.target.value as any }))}
                      className="text-xs bg-[#2c2d32] border-0 rounded px-2 py-1 text-gray-300 focus:ring-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <button
                      onClick={() => dispatch(removeTask(task.id))}
                      className="text-gray-500 hover:text-red-400 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;