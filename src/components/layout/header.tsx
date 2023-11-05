import { Button, IconButton } from '@mui/material'
import { Form, useNavigate } from 'react-router-dom'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { updateSidebarToggled, updateTipReset } from '@/store/modules/user-interface'
import MenuIcon from '@mui/icons-material/Menu'
import { Dispatch, FC, ReactNode } from 'react'
import { useDevice } from '@/hooks/user-interface'

type IProps = {
  children?: ReactNode
}
const Header: FC<IProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const device = useDevice()
  const handleLogout = () => {
    window.localStorage.setItem('token', '')
    navigate('/login')
  }
  const handleTipClick = () => {
    localStorage.setItem('tips', '')
    dispatch(updateTipReset(true))
  }

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-16 box-border bg-[#363d40] flex px-2 md:px-10 items-center justify-between">
      {device?.type === 'mobile' && (
        <IconButton onClick={() => dispatch(updateSidebarToggled(true))}>
          <MenuIcon color="primary" />
        </IconButton>
      )}
      <h1 className="text-white m-0 text-lg md:text-2xl">관리자 시스템</h1>

      <Form>
        <div className="">
          <IconButton onClick={handleTipClick} className="mr-4">
            <TipsAndUpdatesIcon sx={{ color: '#fff', '&:hover': { color: '#409fff' } }} />
          </IconButton>
          <Button type="submit" className="" variant="contained" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Header
