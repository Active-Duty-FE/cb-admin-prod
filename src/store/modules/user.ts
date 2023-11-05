import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
const initialState = {
  username: ''
}
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    }
  }
})

export const { updateUsername } = userSlice.actions
export default userSlice
