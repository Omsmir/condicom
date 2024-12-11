"use client"
import { inter } from "@/fonts/fonts"
import { AddEventButton, FadeMenu, SwitchDay, SwitchMonth } from "../togglers/TopBarEvents"
import { CalenderHook } from "../context/CalenderProvider"
const CalenderHeader = ({children}:{children:React.ReactNode}) => {

    const {currDate} = CalenderHook()
  return (
    <div className={`flex h-screen pt-14 ${inter.className} `}>
      <div className="flex flex-col w-full border dark:bg-[var(--sidebar-accent)] dark:border-slate-800">
        <div className="flex p-4 justify-between items-center bg-[var(--sidebar-background)] ">
          <div className="flex items-center font-medium">
            <SwitchMonth />
            <p className="mx-1">{currDate.getFullYear()}</p>
          </div>
          <div className="flex">
            <SwitchDay />
            <FadeMenu />
            <div className="ml-8 border-l pl-4">
              <AddEventButton  />
            </div>
          </div>
        </div>
        {children}
        </div>
        </div>
  )
}

export default CalenderHeader
