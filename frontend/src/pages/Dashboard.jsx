

import { Sidebar } from '@/components'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
            <Sidebar />

            <div className='flex-1 pt-20 p-4 md:p-8 transition-all duration-300'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard