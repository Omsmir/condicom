export const getUser = async (userId:string | undefined) => {

    const response = await fetch(`http://localhost:8080/api/auth/${userId}`)

    const user = await response.json()

    return user
 
}