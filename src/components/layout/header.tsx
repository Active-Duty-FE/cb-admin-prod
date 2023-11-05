import { Button, IconButton } from '@mui/material'
import { Form, useNavigate } from 'react-router-dom'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import { useAppDispatch } from '@/hooks/store'
import { updateTipReset } from '@/store/modules/user-interface'

function Header() {
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const handleLogout = () => {
    window.localStorage.setItem('token', '')
    navigate('/login')
  }
  const handleTipClick = () => {
    localStorage.setItem('tips', '')
    appDispatch(updateTipReset(true))
  }
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-16 box-border bg-[#363d40] flex px-2 md:px-10 items-center justify-between">
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
