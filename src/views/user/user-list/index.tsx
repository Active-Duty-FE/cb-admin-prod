import React, {
  ChangeEvent,
  Fragment,
  MouseEvent,
  forwardRef,
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState
} from 'react'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useRoleList, useUserList } from '@/service/fetchdata'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  MenuItem,
  Switch,
  TablePagination
} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Formik, FormikProps } from 'formik'
import { useMutation } from 'react-query'
import { appRequest } from '@/service'
import { Response, UserListItem } from '@/types/ResponseType'
import { queryClient } from '@/router'
import AInput from '@/components/common/form/a-input'
import { UserEdit } from '@/types'
import AddUser from './add-user'
import ASelect from '@/components/common/form/a-select'
import { userListKeys } from '@/keys'
import SaveIcon from '@mui/icons-material/Save'
import ClearIcon from '@mui/icons-material/Clear'
import SearchUser from './search-user'
import { useDevice } from '@/hooks/user-interface'
import { getUserInterface, setUserInterface } from '@/utils/localstorage'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#999',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.root}`]: {
    padding: 0,
    height: '56px',
    input: {
      '&:focus': {
        outline: '1px solid #000'
      }
    },
    fieldset: {
      border: 0
    }
  },
  [`&.${tableCellClasses.root}:focus`]: { backgroundColor: '#ff0' },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const UserList = forwardRef(() => {
  const renderCount = useRef(0)
  renderCount.current = renderCount.current + 1

  const [pagesize, setPagesize] = useState(getUserInterface('pagesize') ?? 5)
  const [pagenum, setPagenum] = useState(getUserInterface('pagenum') ?? 1)

  const [isKeywordFocused, setIsKeywordFocused] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { data, isFetching } = useUserList(
    {
      pagenum,
      pagesize,
      query: keyword
    },
    isKeywordFocused
  )
  const device = useDevice()
  const [displayData, setDisplayData] = useState(data)
  const defferedData = useDeferredValue(displayData)
  const roles = useRoleList()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingRow, setEditingRow] = useState<number[]>([])
  const [deleteId, setDeleteId] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [initialValues, setInitialValues] = useState<UserEdit[]>(
    Array(5).map(() => {
      return { id: NaN, email: 'a', mobile: 'ddd', role_name: '권한 없음' }
    })
  )
  const isStale = data !== defferedData
  useEffect(() => {
    return () => {
      setUserInterface('pagenum', '1')
    }
  }, [])
  useEffect(() => {
    if (data) {
      setDisplayData(data)
      setInitialValues(
        data?.data.users ??
          Array(5).map(() => {
            return { id: NaN, email: 'a', mobile: 'ddd', role_name: '권한 없음' }
          })
      )
      setTotalCount(data.data.total)
    }
  }, [data])

  const fetchAllUser = () => {
    setKeyword('')
  }
  const mutateUserEdit = useMutation({
    // mutationKey: [userListKeys.all, 'userEdit', editItemValue?.email, editItemValue?.mobile],
    mutationFn: (value: UserEdit) =>
      appRequest.put<Response<UserListItem>>(`/users/${value?.id}`, {
        data: { id: value.id, email: value.email, mobile: value.mobile }
      }),
    onMutate: (value: UserEdit) => {
      queryClient.cancelQueries(userListKeys.list({ pagenum, pagesize, query: keyword }))
      queryClient.setQueryData(userListKeys.list({ pagenum, pagesize, query: keyword }), (old: any) => {
        const newOld = old.data.data.users.map((item: any) => {
          if (item.id === value.id) {
            item.mobile = value.mobile
            item.email = value.email
          }
          return item
        })
        return Object.assign(old, newOld)
      })
      return value
    },
    onSettled: (res) => {
      queryClient.invalidateQueries(userListKeys.list({ pagenum, pagesize, query: keyword }))
    }
  })

  const mutateRole = useMutation({
    // mutationKey: [...userListKeys.all, 'user', 'mutateRole', editItemValue?.role_name],
    mutationFn: (value: UserEdit) => {
      const roleId = getRoleIdbasedOnRolename(value.role_name)
      return appRequest.put<Response<UserListItem>>(`/users/${value?.id}/role`, { data: { rid: roleId } })
    },
    onMutate: (value: UserEdit) => {
      queryClient.cancelQueries(userListKeys.list({ pagenum, pagesize, query: keyword }))
      queryClient.setQueryData(userListKeys.list({ pagenum, pagesize, query: keyword }), (old: any) => {
        const newOld = old.data.data.users.map((item: any) => {
          if (item.id === value.id) {
            item.role_name = value.role_name
          }
          return item
        })
        return Object.assign(old, newOld)
      })
      return value
    },
    onSuccess: (res) => {
      if (res.data.meta.status === 400) {
      }
    },
    onSettled: (res) => {
      // queryClient.invalidateQueries(userListKeys.list({ pagenum, pagesize, query: keyword }))
    }
  })
  const getRoleIdbasedOnRolename = (role_name: string) => {
    let roleId = -1
    roles.data?.forEach((item) => {
      if (item.roleName === role_name) {
        roleId = item.id
      }
    })
    return roleId
  }
  const submitUserEdit = async (value: UserEdit) => {
    mutateUserEdit.mutate(value)
    mutateRole.mutate(value)
  }
  const mutateUserState = useMutation({
    mutationFn: (row: UserListItem) => appRequest.put(`/users/${row.id}/state/${row.mg_state}`),
    onMutate: (row: UserListItem) => {
      queryClient.cancelQueries(userListKeys.list({ pagenum, pagesize, query: keyword }))
      queryClient.setQueryData(userListKeys.list({ pagenum, pagesize, query: keyword }), (old: any) => {
        const newOld = old.data.data.users.map((item: any) => {
          if (item.id === row.id) {
            item.mg_state = !item.mg_state
          }
          return item
        })
        return Object.assign(old, newOld)
      })
    },
    onSettled: (res) => {
      queryClient.invalidateQueries(userListKeys.list({ pagenum, pagesize, query: keyword }))
    }
  })
  const changeUserState = (row: UserListItem) => {
    mutateUserState.mutate(row)
  }
  const deleteConfirm = (rowId: number) => {
    queryClient
      .fetchQuery({ queryFn: () => appRequest.delete<Response<null>>(`/users/${rowId}`), staleTime: 0 })
      .then((res) => {
        if (res.data.meta.status === 200) {
          queryClient.invalidateQueries({ queryKey: userListKeys.list({ pagenum, pagesize, query: keyword }) })
          setConfirmOpen(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const deleteHandler = (e: MouseEvent<HTMLButtonElement>, rowId: number) => {
    setDeleteId(rowId)
    setConfirmOpen(true)
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPagenum(newPage + 1)
    setUserInterface('pagenum', newPage + 1 + '')
  }
  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    setPagesize(Number(e.target.value))
    setUserInterface('pagesize', e.target.value)
    setUserInterface('pagenum', '1')
    setPagenum(1)
  }
  const searchFn = (keyword: string) => {
    setKeyword(keyword)
    setUserInterface('pagenum', '1')
    setPagenum(1)
  }

  const handleEditCancel = (index: number, formik: any) => {
    setEditingRow((c) => c.filter((item) => item !== index))
    formik.resetForm()
  }
  const getIndexBasedOnPage = (index: number) => {
    return (pagenum - 1) * pagesize + index + 1
  }
  const handleSaveClick = async (index: number, formik: FormikProps<UserEdit>) => {
    formik.submitForm()
    setEditingRow((c) => c.filter((item) => item !== getIndexBasedOnPage(index)))
  }
  return (
    <>
      <div className="flex justify-between pb-0 flex-col md:flex-row">
        <div className="flex">
          <SearchUser
            isKeywordFocused={isKeywordFocused}
            setIsKeywordFocused={useCallback(setIsKeywordFocused, [setIsKeywordFocused])}
            setKeyword={useCallback(setKeyword, [setKeyword])}
            searchFn={searchFn}
          />
        </div>
        <div className="flex justify-between flex-1 mt-2 md:mt-0">
          <Button className="md:ml-4 h-14" variant="contained" color="success" onClick={fetchAllUser}>
            모두 보기
          </Button>
          <AddUser totalCount={totalCount} setTotalCount={useCallback(setTotalCount, [setTotalCount])} />
        </div>
      </div>

      <div className="mt-7 w-auto">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow className="text-center">
                <StyledTableCell className="pl-3" width={30}>
                  No.
                </StyledTableCell>
                <StyledTableCell className="min-w-[170px]">ID</StyledTableCell>
                <StyledTableCell width={170}>E-MAIL</StyledTableCell>
                <StyledTableCell width={170}>PHONE</StyledTableCell>
                <StyledTableCell width={170}>ROLE</StyledTableCell>
                <StyledTableCell align="center">STATUS</StyledTableCell>
                <StyledTableCell className="min-w-[100px]" align="center">
                  MODIFY
                </StyledTableCell>
                <StyledTableCell align="center">DELETE</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody style={{ opacity: isStale && isFetching ? '0.5' : '1' }}>
              {defferedData &&
                defferedData.data &&
                defferedData.data.users.map((row: UserListItem, index: number) => (
                  <Fragment key={row.id}>
                    <Formik initialValues={initialValues[index]} onSubmit={submitUserEdit}>
                      {(formik) => (
                        <TableRow className={`${editingRow.includes(getIndexBasedOnPage(index)) && 'bg-stone-400/10'}`}>
                          <StyledTableCell className="pl-3">{getIndexBasedOnPage(index)}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.username}
                          </StyledTableCell>
                          {editingRow.includes(getIndexBasedOnPage(index)) ? (
                            <>
                              <StyledTableCell>
                                <AInput name="email" />
                              </StyledTableCell>
                              <StyledTableCell>
                                <AInput name="mobile" />
                              </StyledTableCell>
                              <StyledTableCell>
                                <ASelect name="role_name">
                                  {roles &&
                                    roles.data &&
                                    roles.data.map((item) => {
                                      return (
                                        <MenuItem key={item.id} value={item.roleName}>
                                          {item.roleName}
                                        </MenuItem>
                                      )
                                    })}
                                  <MenuItem disabled value="권한 없음">
                                    권한 없음
                                  </MenuItem>
                                </ASelect>
                              </StyledTableCell>
                            </>
                          ) : (
                            <>
                              <StyledTableCell>{row.email}</StyledTableCell>
                              <StyledTableCell>{row.mobile}</StyledTableCell>
                              <StyledTableCell>{row.role_name}</StyledTableCell>
                            </>
                          )}

                          <StyledTableCell align="center">
                            <Switch
                              defaultChecked={row.mg_state}
                              inputProps={{ 'aria-label': 'Switch demo' }}
                              onChange={() => changeUserState(row)}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {editingRow?.includes(getIndexBasedOnPage(index)) ? (
                              <>
                                <IconButton onClick={() => handleSaveClick(index, formik)}>
                                  <SaveIcon color="secondary" />
                                </IconButton>
                                <IconButton onClick={() => handleEditCancel(getIndexBasedOnPage(index), formik)}>
                                  <ClearIcon />
                                </IconButton>
                              </>
                            ) : (
                              <Button onClick={() => setEditingRow((c) => [...c, getIndexBasedOnPage(index)])}>
                                <BorderColorIcon />
                              </Button>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button onClick={(e) => deleteHandler(e, row.id)}>
                              <DeleteForeverIcon />
                            </Button>
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </Formik>
                  </Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={pagesize}
          page={pagenum - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <Dialog open={confirmOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle className="flex items-center p-2 md:p-4">
          <ErrorOutlineIcon fontSize={device?.type === 'mobile' ? 'small' : 'large'} color="warning" />
          <h3 className="ml-2 text-base md:text-2xl text-stone-600">삭제하시겠습니까?</h3>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => deleteConfirm(deleteId)} autoFocus>
            확인
          </Button>
          <Button onClick={() => setConfirmOpen(false)}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
})
export default UserList
