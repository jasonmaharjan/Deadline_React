import { notification } from 'antd';

export const Notification = (type, message, description) => {
   notification[type]({
      message, 
      description,
      duration: 2,
      placement: 'topRight'
   })
}