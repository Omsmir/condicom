
import Profile from "@/components/register/Profile"
import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Health - Profile",
  description: "User Profile",
 };

const page = () => {
  return (
    <main className='min-h-screen flex justify-center items-center py-4 px-4 sm:px-0'>
      <div className="sub-container max-w-[680px]">
      <Profile />
      </div>
    </main>
  )
}

export default page
