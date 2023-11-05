import { Button } from '@mui/material'
import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import FormModal from '../common/form-modal'

interface IProps {
  children?: ReactNode
}

const AddRole: FC<IProps> = memo(() => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="flex">
        <Button className="h-14" variant="contained" onClick={() => setOpen(true)}>
          역할 추가
        </Button>
      </div>
      <FormModal open={open} setOpen={setOpen} type="create" />
    </>
  )
})

export default AddRole

AddRole.displayName = 'AddRole'
