import axios from 'axios';
import React from 'react'

const HandleAxiosErrors = () => {
    const handleApiError = (error: unknown) => {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            api.error({
              message: "Network Error",
              description: "Failed to connect to the server. Please check your internet.",
            });
            return;
          }
      
          if (error.response.status === 400) {
            api.error({
              message: "Validation Error",
              description: error.response.data?.message || "Some fields are incorrect.",
            });
          } else if (error.response.status === 401) {
            api.error({
              message: "Unauthorized",
              description: "You are not authorized to perform this action.",
            });
          } else if (error.response.status === 403) {
            api.error({
              message: "Access Denied",
              description: "You do not have permission to add medication.",
            });
          } else if (error.response.status === 404) {
            api.error({
              message: "Resource Not Found",
              description: "The requested resource does not exist.",
            });
          } else if (error.response.status === 500) {
            api.error({
              message: "Server Error",
              description: "Something went wrong on our end. Please try again later.",
            });
          } else {
            api.error({
              message: "Unexpected Error",
              description: error.response.data?.message || "An unexpected error occurred.",
            });
          }
        } else if (error instanceof Error) {
          api.error({
            message: "Unexpected Error",
            description: error.message,
          });
        } else {
          api.error({
            message: "Unknown Error",
            description: "An unknown error occurred. Please try again.",
          });
        }
      };
      
  return (
    <div>
      
    </div>
  )
}

export default HandleAxiosErrors
