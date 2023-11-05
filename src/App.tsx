import React, { useEffect, useRef } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useAppSelector } from './hooks/store'
import { useSnackbar } from 'notistack'

function App() {
  const { enqueueSnackbar } = useSnackbar()
  const isFirstLoad = useRef(true)
  const { meta } = useAppSelector((state) => {
    return {
      meta: state.metaSlice
    }
  })
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
