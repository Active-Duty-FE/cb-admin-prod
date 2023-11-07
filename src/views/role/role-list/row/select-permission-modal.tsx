import ModalBox from '@/components/common/modal/modal-box'
import { IconButton, Modal } from '@mui/material'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RoleChild } from '@/types/ResponseType'
import { usePermission } from '@/service/fetchdata'
import TreeView from './tree-view'
import { Close } from '@mui/icons-material'
import Title from '@/components/common/title'

interface IProps {
  children?: ReactNode
  open: boolean
  row: RoleChild[]
  roleId: number
  setSelectedPermissionsModalOpen: (selectedPermissionsModalOpen: boolean) => void
}

const SelectPermissionModal: FC<IProps> = memo(({ open, row, setSelectedPermissionsModalOpen, roleId }) => {
  const allPermissions = usePermission()
  const permissions = getPermissions(row)

  function getPermissions(row: RoleChild[]) {
    let permissions: number[] = []
    row.forEach((item) => {
      permissions.push(item.id)
      if (item.children) {
        getPermissions(item.children)
      }
    })
    return permissions
  }
  const handleModalClose = () => {
    setSelectedPermissionsModalOpen(false)
    document.body.style.overflow = 'auto'
  }
  return (
    <div>
      <Modal className="overflow-scroll" open={open} onClose={handleModalClose}>
        <ModalBox>
          <Title>역할 분배</Title>
          {allPermissions.data && allPermissions.data.data && (
            <TreeView
              data={allPermissions.data.data.data}
              permissions={permissions}
              roleId={roleId}
              setSelectedPermissionsModalOpen={setSelectedPermissionsModalOpen}
            />
          )}
          <IconButton className="absolute right-2 top-2" onClick={handleModalClose}>
            <Close />
          </IconButton>
        </ModalBox>
      </Modal>
    </div>
  )
})

export default SelectPermissionModal

SelectPermissionModal.displayName = 'SelectPermissionModal'
