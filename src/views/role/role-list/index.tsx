import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useRoleList } from '@/service/fetchdata'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Row from './row'

interface IProps {
  children?: ReactNode
  expanded: boolean
}

const RoleList: FC<IProps> = memo(({ expanded }) => {
  const { data } = useRoleList()

  return (
    <TableContainer className="mt-4" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className="bg-slate-300">
          <TableRow>
            <TableCell width={30} />
            <TableCell width={50}>No.</TableCell>
            <TableCell align="center">역할이름</TableCell>
            <TableCell align="center">역할소개</TableCell>
            <TableCell align="center">컨트롤</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => <Row expanded={expanded} key={row.id} row={row} index={index} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export default RoleList

RoleList.displayName = 'RoleList'
