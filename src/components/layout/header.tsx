import { Button, IconButton, useTheme } from '@mui/material'
import { Form, useNavigate } from 'react-router-dom'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { updateSidebarToggled, updateTipReset } from '@/store/modules/user-interface'
import MenuIcon from '@mui/icons-material/Menu'
import { Dispatch, FC, ReactNode } from 'react'
import { useDevice } from '@/hooks/user-interface'
import { setUserInterface } from '@/utils/localstorage'

type IProps = {
  children?: ReactNode
}
const Header: FC<IProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const device = useDevice()

  const handleLogout = () => {
    window.localStorage.setItem('token', '')
    setUserInterface('pagesize', '5')
    setUserInterface('pagenum', '1')
    setUserInterface('sidebarCollapsed', '0')
    navigate('/login')
  }
  const handleTipClick = () => {
    setUserInterface('tips', '0')
    dispatch(updateTipReset(true))
  }
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-16 box-border bg-primary flex px-2 md:px-10 items-center justify-between">
      {device?.type === 'mobile' && (
        <IconButton onClick={() => dispatch(updateSidebarToggled(true))}>
          <MenuIcon color="success" />
        </IconButton>
      )}
      <h1 className="text-white m-0 text-lg md:text-2xl">어드민 시스템</h1>

      <Form>
        <IconButton onClick={handleTipClick} className="mr-4">
          <TipsAndUpdatesIcon color="success" />
        </IconButton>
        <Button type="submit" className="" color="success" variant="contained" onClick={handleLogout}>
          로그아웃
        </Button>
      </Form>
    </div>
  )
}

export default Header
