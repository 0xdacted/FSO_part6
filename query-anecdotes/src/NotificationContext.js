import { createContext, useEffect, useReducer, useContext } from 'react';

export const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.payload,
        show: true
      }
    case 'HIDE_NOTIFICATION':
      return {
        message: '',
        show: false
      }
    default: 
      return state;
  }
}

const NotificationContext = createContext();


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: '', show: false })

  useEffect(() => {
    let notificationTimeout;
    if (notification.show) {
      notificationTimeout = setTimeout(() => {
        notificationDispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000)
    }
    return () => clearTimeout(notificationTimeout);
  }, [notification.show])
  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext;