import { DashboardProvider } from "@/components/context/Dashboardprovider"
import { Metadata } from "next"
import { PrimeReactProvider } from 'primereact/api';



export const metadata:Metadata = {
    title:"Doctors"
}

 const RootLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <DashboardProvider>
            <PrimeReactProvider>
            {children}
            </PrimeReactProvider>
        </DashboardProvider>
    )
}

export default RootLayout