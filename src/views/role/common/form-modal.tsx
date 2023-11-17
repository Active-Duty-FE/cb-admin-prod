import AInput from '@/components/common/form/a-input'
import ModalBox from '@/components/common/modal/modal-box'
import Title from '@/components/common/title'
import { roleListKeys } from '@/keys'
import { RoleFormSchema } from '@/schema'
import { appRequest } from '@/service'
import { RoleForm } from '@/types'
import { RoleParent } from '@/types/ResponseType'
import { Close, Refresh } from '@mui/icons-material'
import { Backdrop, Button, IconButton, Modal, Tooltip } from '@mui/material'
import { Formik } from 'formik'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useQueryClient } from 'react-query'
import { Form } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  type: 'create' | 'update'
  defaultValue?: RoleParent
}

const FormModal: FC<IProps> = memo(({ open, setOpen, type, defaultValue }) => {
  const queryClient = useQueryClient()

  const handleClose = () => {
    setOpen(false)
  }
  const submitForm = (value: RoleForm) => {
    queryClient.fetchQuery({
      queryFn: () => {
        switch (type) {
          case 'create':
            return appRequest.post('/roles', { data: value }).then((res) => {
              setOpen(false)
              queryClient.invalidateQueries(roleListKeys.lists())
            })
          case 'update':
            return appRequest.put(`/roles/${defaultValue?.id}`, { data: value }).then((res) => {
              setOpen(false)
              queryClient.invalidateQueries(roleListKeys.lists())
            })
          default:
            break
        }
      },
      staleTime: 0
    })
  }

  return (
    <div>
      <Backdrop open={open} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <ModalBox>
          <Title>역할 추가</Title>
          <Formik
            initialValues={{ roleName: defaultValue?.roleName ?? '', roleDesc: defaultValue?.roleDesc ?? '' }}
            onSubmit={submitForm}
            validationSchema={RoleFormSchema}
          >
            {(formkik) => (
              <Form>
                <div className="flex flex-col">
                  <AInput className="" label="ROLE-NAME" name="roleName" placeholder="롤(역할) 이름을 입력하세요."></AInput>
                  <AInput
                    className="mt-2"
                    label="ROLE-DESC"
                    name="roleDesc"
                    placeholder="롤(역할) 설명을 입력하세요."
                  ></AInput>
                  <div className="flex items-center mt-3 ">
                    <Button color="success" className="flex-1" variant="contained" onClick={() => formkik.submitForm()}>
                      확인
                    </Button>
                    <Tooltip className="ml-2" title="reset" placement="top" arrow>
                      <IconButton onClick={() => formkik.resetForm()}>
                        <Refresh />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <IconButton className="absolute right-2 top-2" onClick={() => setOpen(false)}>
                    <Close />
                  </IconButton>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBox>
      </Modal>
    </div>
  )
})

export default FormModal

FormModal.displayName = 'FormModal'
