import React from 'react'

import { Link } from '@tanstack/react-router'
import { Calendar, Home, Inbox, Search, Settings, Plus, PieChartIcon, AppWindow } from 'lucide-react'
// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home
  },
  {
    title: 'Apps',
    url: '/apps',
    icon: AppWindow
  },
  {
    title: 'Stats',
    url: '/stats',
    icon: PieChartIcon
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings
  }
]


const Appbar = () => {
  return (
    <div className='flex flex-col items-center justify-between w-20 h-screen py-6'>
        <div className='bg-white w-12 h-12 rounded-full'></div>

        <div className='flex flex-col gap-4'>
            {items.map((item) => (
                <Link to={item.url} key={item.title} activeProps={{className: "bg-neutral-100 hover:bg-neutral-300"}} inactiveProps={{className: "bg-neutral-800 hover:bg-neutral-500"}} className='group transition-all w-12 h-12 rounded-full flex items-center justify-center duration-300'>
                    <item.icon className='text-neutral-700 group-[.bg-neutral-800]:group-hover:text-neutral-300 group-[.bg-neutral-100]:group-hover:text-neutral-900 duration-300'/>
                </Link>
            ))}
            
        </div>

        <div className='h-6'></div>

        <button className='group transition-all flex justify-center items-center bg-neutral-800 hover:bg-neutral-500 w-12 h-12 rounded-full duration-300'>
            <Plus className='text-neutral-300 group-hover:text-neutral-100 duration-300'/>
        </button>
    </div>
  )
}

export default Appbar