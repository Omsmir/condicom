"use client"
import React from 'react'
import { DashboardHook } from "../context/Dashboardprovider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CheckOutlined, FilterOutlined } from '@ant-design/icons';
const NotificationFilterMenu = () => {
    const {allFilter,setAllFilter,todayFilter,setTodayFilter,yesterdayFilter,setYesterdayFilter} = DashboardHook()


    const handleCheckedFilter =({onclick}:{onclick?:React.Dispatch<React.SetStateAction<any>>}) => {
      setAllFilter(false)
      setTodayFilter(false)
      setYesterdayFilter(false)
      if(onclick){
        onclick(true)
      }
    }
  return (
    <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="flex justify-center text-slate-500">
            <FilterOutlined /> <p className="text-sm ml-1">Filters</p>
          </MenuButton>
          <MenuItems transition className="Tailwind-Dropdown ">
            <MenuItem>
              <div className="flex justify-between tailwind-menuItem" onClick={() => handleCheckedFilter({onclick:setAllFilter})}>
                <p>All</p>
                {allFilter && <CheckOutlined/>}

              </div>
            </MenuItem>
            <MenuItem>
            <div className="flex justify-between tailwind-menuItem" onClick={() => handleCheckedFilter({onclick:setTodayFilter})}>
                <p>Today</p>
                {todayFilter && <CheckOutlined/>}
              </div>
            </MenuItem>
            <MenuItem>
            <div className="flex justify-between tailwind-menuItem" onClick={() => handleCheckedFilter({onclick:setYesterdayFilter})}>
                <p>Yesterday</p>
                {yesterdayFilter && <CheckOutlined/>}
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
  )
}

export default NotificationFilterMenu
