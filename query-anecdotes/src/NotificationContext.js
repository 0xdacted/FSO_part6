import { createContext, useEffect, useReducer } from 'react';

const notificationReducer = (state, action) => {
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

const NotificationContext = createContext();

export default NotificationContext;