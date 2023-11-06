import { useNavigate, useRouteError } from 'react-router-dom'
import { useEffect } from 'react'

import UndoIcon from '@mui/icons-material/Undo'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function ErrorEl() {
  const navigate = useNavigate()

  return (
    <div className="text-[#ed6c02] text-center">
      <h2 className="mt-48">404, 존재하지 않는 페이지 입니다.</h2>
      <Button color="success" variant="contained" onClick={() => navigate(-1)}>
        돌아가기
        <UndoIcon />
      </Button>
    </div>
  )
}

export default ErrorEl
