/**
* authSlice.js
* Creates a variable at the browser Local Storage if the user is Authenticated
* @author   José Luis Lobera | jlobera@hopewellsystem.com
* @date     06.12.2022
*/

import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
    return true
  }

  return false
}

const initialState = {
  isAuth: userAuthFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true
    },
    unauthenticateUser: (state) => {
      state.isAuth = false
    },
  },
})

export const { authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer