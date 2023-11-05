import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { permissionKeys, roleListKeys } from '@/keys'
import { appRequest } from '@/service'
import { RoleChild } from '@/types/ResponseType'
import { Button, Chip, Dialog, DialogActions, DialogTitle } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useQueryClient } from 'react-query'
import { useDevice } from '@/hooks/user-interface'

interface IProps {
  children?: ReactNode
  roleChild: RoleChild
  roleId: number
}

const CollapsedRow: FC<IProps> = memo(({ roleChild, roleId }) => {
  const queryClient = useQueryClient()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(NaN)
  const device = useDevice()
  const confirmDeletePermission = (roleId: number, rightsId: number) => {
    if (roleId && rightsId) {
      queryClient
        .fetchQuery({
          queryKey: [...permissionKeys.delete(roleId, Number(rightsId))],
          queryFn: () => appRequest.delete(`/roles/${roleId}/rights/${rightsId}`)
        })
        .then((res) => {
          queryClient.invalidateQueries([...roleListKeys.lists()])
        })
    } else {
      queryClient
        .fetchQuery({
          queryKey: [...roleListKeys.delete(roleId)],
          queryFn: () => appRequest.delete(`/roles/${roleId}`)
        })
        .then((res) => {
          queryClient.invalidateQueries([...roleListKeys.lists()])
        })
    }
  }
  const deletePermissionHandler = (deleteId: number) => {
    setDeleteId(deleteId)
    setConfirmOpen(true)
  }
  return (
    <>
      <Chip
        color={roleChild.pid === '0' ? 'info' : roleChild.pid === '1' ? 'success' : 'default'}
        variant="outlined"
        className="m-3 min-w-[120px] hover:bg-stone-100"
        label={roleChild.authName}
        onDelete={() => deletePermissionHandler(roleChild.id)}
      />
      <Dialog open={confirmOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle className="flex items-center p-2 md:p-4">
          <ErrorOutlineIcon fontSize={device?.type === 'mobile' ? 'small' : 'large'} color="warning" />
          <h3 className="ml-2 text-base md:text-2xl text-stone-600">삭제하시겠습니까?</h3>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => confirmDeletePermission(roleId, deleteId)} autoFocus>
            확인
          </Button>
          <Button onClick={() => setConfirmOpen(false)}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
})

export default CollapsedRow

CollapsedRow.displayName = 'Collapse'
