import { Select } from '@mui/material'
import { useField } from 'formik'
import React, { memo } from 'react'

const ASelect = memo((props: any) => {
  const [field] = useField(props)
  return <Select {...props} {...field}></Select>
})

export default ASelect

ASelect.displayName = 'ASelect'
