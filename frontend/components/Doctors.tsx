import { Payment,columns } from "./relatedComponents/Columns"
import { DataTable } from "./relatedComponents/Table"
import { CustomerService } from "./service/Data"
async function getData(): Promise<any> {
  // Fetch data from your API here.
  const data =     CustomerService.getCustomersXLarge()

  console.log((await data).map((ele) => ele))

  return (await data).map((ele) => ele)
  
}

export default async function Doctors() {
  const data = await getData()

  return (
    <div className="">
       <DataTable columns={columns} data={data} />
 
    </div>
  )
}
