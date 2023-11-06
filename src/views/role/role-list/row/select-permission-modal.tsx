import ModalBox from '@/components/common/modal/modal-box'
import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import React, { memo } from 'react'
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react'

interface IProps {
  children?: ReactNode
  open: boolean
  setSelectedPermissionsModalOpen: Dispatch<SetStateAction<boolean>>
}

const SelectPermissionModal: FC<IProps> = memo(({ open, setSelectedPermissionsModalOpen }) => {
  return (
    <div>
      <Modal open={open}>
        <ModalBox>
          aaa
          <IconButton className="absolute right-2 top-2" onClick={() => setSelectedPermissionsModalOpen(false)}>
            <Close />
          </IconButton>
        </ModalBox>
      </Modal>
    </div>
  )
})

export default SelectPermissionModal

SelectPermissionModal.displayName = 'SelectPermissionModal'
