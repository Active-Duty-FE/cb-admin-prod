import { number, object, string } from 'yup'

export const loginSchema = object({
  username: string().required('아이디는 필수 입력 사항입니다.'),
  password: string().required('비밀번호는 필수 입력 사항입니다.')
})
export const userEditSchema = object({
  email: string().email().required('이메일은 필수 입력 사항입니다.'),
  mobile: number().min(11).max(11).required('핸드폰 번호는 필수 입력 사항입니다.')
})
export const keywordSchema = object({
  keyword: string().required('키워드를 입력해주세요.')
})
export const createUserSchema = object({
  username: string()
    .min(5, '아이디는 6 ~ 20사이의 영문자와 수자로 조성되어야 합니다.')
    .matches(/^[a-zA-Z0-9]+$/, '영문자와 숫자만 입력해야 합니다')
    .max(20, '아이디는 6 ~ 20사이의 영문자와 숫자로 조성되어야 합니다.')
    .required('아이디는 필수 입력 사항입니다.'),
  password: string()
    .min(5, '비밀번호는 6 ~ 20사이의 영문자와 숫자로 조성되어야 합니다.')
    .matches(/^[a-zA-Z0-9]+$/, '영문자와 수자만 입력해야 합니다')
    .max(20, '비밀번호는 6 ~ 20사이의 영문자와 숫자로 조성되어야 합니다.')
    .required('비밀번호는 필수 입력 사항입니다.'),
  email: string().email().required('이메일은 필수 입력 사항입니다.'),
  mobile: string()
    .min(11, '010을 포함한 11자리번호를 입력해주세요.')
    .max(11, '010을 포함한 11자리번호를 입력해주세요.')
    .required('핸드폰 번호는 필수 입력 사항입니다.')
    .matches(/^[0-9]+$/, '숫자로만 입력해야 합니다')
})
export const RoleFormSchema = object({
  roleName: string().required(),
  roleDesc: string()
})
