import { TableCell, TableRow, tableCellClasses } from '@mui/material'
import styled, { css } from 'styled-components'

export const CustomHorTableTh = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  z-index: 1;
  width: 25%;
  height: 3rem;
  padding: 12px;
  word-break: break-all;
  background-color: #ccc;
`
export const CustomHorTableTd = styled.div`
  flex: 1;
  overflow-x: scroll;
  width: 25%;
  height: 3rem;
  padding: 12px;
  line-height: 3rem;
  white-space: nowrap;
`
export const CustomHorTable = styled.div`
  overflow: hidden;
  border: 1px solid #111;
  border-radius: 5px;
`

export const CustomHorBody = styled.div<{ isLast: boolean }>`
  border-bottom: 1px solid #111;
  ${(props) =>
    props.isLast &&
    css`
      border-bottom: 0;
    `}
`

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: '#e0e0e0'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))
