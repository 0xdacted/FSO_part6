import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      console.log(action)
      return action.payload
    },
    clearNotification: (state) => {
      return null
    }
  }
})

export const setNewNotification = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    // Remove the notification after 5 seconds
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer