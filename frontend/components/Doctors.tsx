import { Payment,columns } from "./relatedComponents/Columns"
import { DataTable } from "./relatedComponents/Table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function Doctors() {
  const data = await getData()

  return (
    <div className="container mx-auto py-24">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
