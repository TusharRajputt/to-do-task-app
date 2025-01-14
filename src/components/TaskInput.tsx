import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/tasksSlice';
import { Plus } from 'lucide-react';
import type { Task } from '../types';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));
    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-[#25262b] border-0 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-green-500"
        />
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default TaskInput;