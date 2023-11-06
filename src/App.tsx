import React, { useEffect, useRef } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useAppSelector } from './hooks/store'
import { useSnackbar } from 'notistack'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from './store'

function App() {
  const { enqueueSnackbar } = useSnackbar()
  const isFirstLoad = useRef(true)
  const getMeta = createSelector(
    (state: RootState) => state.metaSlice,
    (meta) => meta
  )
  const meta = useAppSelector(getMeta)
  const isSuccessType = /^2\d+/.test(meta.status.toString())

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    enqueueSnackbar(meta.msg, {
      variant: isSuccessType ? 'success' : 'warning',
      autoHideDuration: isSuccessType ? 1000 : 5000
    })
  }, [meta.switch, enqueueSnackbar, isSuccessType, meta.msg])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
