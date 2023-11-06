import { useDevice } from '@/hooks/user-interface'
import { Box } from '@mui/material'
import React, { forwardRef, memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const ModalBox: FC<IProps> = memo(({ children }) => {
  const device = useDevice()
  return (
    <Box
      sx={{
        zIndex: 2,
        width: () => (device?.type === 'mobile' ? '80%' : '400px'),
        padding: () => (device?.type === 'mobile' ? '12px' : '50px'),
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff'
      }}
    >
      {children}
    </Box>
  )
})

export default ModalBox

ModalBox.displayName = 'ModalBox'
