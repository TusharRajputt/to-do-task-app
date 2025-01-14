import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { setSearchQuery } from '../store/slices/tasksSlice';
import { LogOut, Settings, Bell, Search } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="bg-[#25262b] border-b border-gray-800">
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              onChange={handleSearch}
              className="w-full bg-[#2c2d32] border-0 rounded-lg pl-10 pr-4 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800">
            <Settings className="h-5 w-5" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;