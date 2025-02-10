import { NotificationInstance } from 'antd/es/notification/interface';
import axios from 'axios';
import React from 'react'

const HandleAxiosErrors = ({api,error}:{api:NotificationInstance,error:Error}) => {
     
      if (axios.isAxiosError(error)) {
        if (error.response) {
          api.error({
            message: `${error.response.data.message}`,
            description: "something went wrong",
            showProgress: true,
            pauseOnHover: false,
          });
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
      };
      
 return handleApiError
}

export default HandleAxiosErrors
