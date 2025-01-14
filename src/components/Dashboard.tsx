import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Header from './Header';
import { CircleUser, Home, PieChart, Settings, Users } from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-[#1a1b1e]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#25262b] border-r border-gray-800">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <CircleUser className="w-6 h-6 text-gray-300" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-200">{user?.name}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
            </div>
          </div>
          <nav className="mt-6 px-3">
            <div className="space-y-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-md">
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-200 bg-gray-800 rounded-md">
                <PieChart className="w-5 h-5 mr-3" />
                Tasks
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-md">
                <Users className="w-5 h-5 mr-3" />
                Team
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-md">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </a>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <TaskInput />
              <div className="mt-6">
                <TaskList />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;