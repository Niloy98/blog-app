import { ChartColumnBig, SquareUser } from 'lucide-react'
import { LiaCommentSolid } from "react-icons/lia";
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa';

const Sidebar = () => {
  const getLinkClasses = ({ isActive }) => {
    return `flex items-center gap-3 font-semibold cursor-pointer p-3 px-4 rounded-xl w-full transition-all duration-200 
    ${isActive 
      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md" 
      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
    }`;
  };

  return (
    <div className='hidden md:block fixed left-0 top-0 h-screen w-[300px] border-r-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 z-40 pt-24 px-6 overflow-y-auto'>
      
      <div className='flex flex-col space-y-3'>

        <NavLink to='/dashboard/profile' className={getLinkClasses}>
          <SquareUser className="w-5 h-5" />
          <span className="text-lg">Profile</span>
        </NavLink>

        <NavLink to='/dashboard/your-blog' className={getLinkClasses}>
          <ChartColumnBig className="w-5 h-5" />
          <span className="text-lg">Your Blogs</span>
        </NavLink>

        <NavLink to='/dashboard/comments' className={getLinkClasses}>
          <LiaCommentSolid className="w-6 h-6" />
          <span className="text-lg">Comments</span>
        </NavLink>

        <NavLink to='/dashboard/write-blog' className={getLinkClasses}>
          <FaRegEdit className="w-5 h-5"/>
          <span className="text-lg">Create Blog</span>
        </NavLink>
      </div>

    </div>
  )
}

export default Sidebar