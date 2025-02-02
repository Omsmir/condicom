import axios, { isAxiosError } from "axios"

const baseUrl = process.env.NEXT_API

export const getAllPatients = async () => {
    try {
        const response = await axios.get(`${baseUrl}/patient`)

        const data = await response.data.patients
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
              throw new Error()
            } else {
              api.error({
                message: "No Response from Server",
                description:
                  "Please check your network connection or try again later.",
                showProgress: true,
                pauseOnHover: false,
              });
            }
          } else if (error instanceof Error) {
            api.error({
              message: "Unexpected Error",
              description: error.message,
              showProgress: true,
              pauseOnHover: false,
            });
          }
    }
}