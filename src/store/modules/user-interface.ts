import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
const initialState = {
  tipReset: false,
  sidebarToggled: false
}
const userInterfaceSlice = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    updateTipReset(state, action: PayloadAction<boolean>) {
      state.tipReset = action.payload
    },
    updateSidebarToggled(state, action: PayloadAction<boolean>) {
      state.sidebarToggled = action.payload
    }
  }
})

export const { updateTipReset, updateSidebarToggled } = userInterfaceSlice.actions
export default userInterfaceSlice
