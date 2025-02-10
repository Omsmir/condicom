import { useQuery } from "@tanstack/react-query"

export const UseMedicationsQuery =  () => {
    return useQuery({
        queryKey:["medications"],
        queryFn:()
    })
}