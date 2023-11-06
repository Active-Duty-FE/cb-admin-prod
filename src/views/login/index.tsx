import AInput from '@/components/common/form/a-input'
import { loginSchema } from '@/schema'
import { appRequest } from '@/service'
import { LoginData, SetSubmitting } from '@/types'
import { Response, User } from '@/types/ResponseType'
import { tokenCrypto } from '@/utils/crypto'
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, InputAdornment, Paper } from '@mui/material'
import { Formik, Form } from 'formik'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const submitHandler = async (values: LoginData, { setSubmitting }: { setSubmitting: SetSubmitting }) => {
    setLoading(true)
    try {
      const {
        data: { data, meta }
      } = await queryClient.fetchQuery({
        queryFn: () => appRequest.post<Response<User>>('/login', { data: values }),
        staleTime: 0
      })
      if (meta.status === 200) {
        window.localStorage.setItem('token', tokenCrypto.encrypt({ ...data, time: new Date().getTime() }, 'my-token'))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center ">
      <Paper elevation={10} className="p-4 min-w-[300px]">
        <h1 className="text-center text-[#638BB3]">Log In</h1>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={loginSchema}
          onSubmit={submitHandler}
        >
          <Form className="flex flex-col">
            <AInput
              label="ID"
              name="username"
              type="text"
              placeholder="ID를 입력하세요."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )
              }}
            />
            <AInput
              className="mt-4"
              label="PW"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              color="success"
              variant="contained"
              className="mt-4"
              type="submit"
              disabled={loading ? true : false}
            >
              확인
            </Button>
          </Form>
        </Formik>
        <div className="">id: admin, pw: 123456</div>
      </Paper>
    </div>
  )
}
export default Login
