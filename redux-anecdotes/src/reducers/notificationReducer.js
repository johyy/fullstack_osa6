import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      const notificationToShow = action.payload
      return notificationToShow
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const showNotification = (message, seconds) => {
    return (dispatch) => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, seconds * 1000)
    }
  }