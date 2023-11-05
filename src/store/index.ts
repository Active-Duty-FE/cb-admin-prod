import { configureStore } from '@reduxjs/toolkit'
import userInterfaceSlice from './modules/user-interface'
import metaSlice from './modules/meta'
import userSlice from './modules/user'
const store = configureStore({
  reducer: {
    [userInterfaceSlice.name]: userInterfaceSlice.reducer,
    [metaSlice.name]: metaSlice.reducer,
    [userSlice.name]: userSlice.reducer
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     immutableCheck: { warnAfter: 128 },
  //     serializableCheck: { warnAfter: 128 }
  //   }),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
