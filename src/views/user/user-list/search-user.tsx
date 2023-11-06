import React, { memo } from 'react'

import type { FC, ReactNode } from 'react'
import { Button } from '@mui/material'
import { Form, Formik } from 'formik'

import AInput from '@/components/common/form/a-input'
import { keywordSchema } from '@/schema'

interface IProps {
  children?: ReactNode
  searchFn: (keyword: string) => void
  setKeyword: (keyword: string) => void
  setIsKeywordFocused: (isKeywordFocused: boolean) => void
  isKeywordFocused: boolean
}

const SearchUser: FC<IProps> = memo(({ searchFn, setKeyword, setIsKeywordFocused }) => {
  const submitFormHandler = (value: { keyword: string }) => {
    searchFn(value.keyword)
  }

  return (
    <Formik
      initialValues={{ keyword: '' }}
      validationSchema={keywordSchema}
      onSubmit={submitFormHandler}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(formik) => (
        <Form className="flex w-full md:w-auto">
          <AInput className="flex-1 md:flex-auto " name="keyword" type="text" placeholder="ID를 입력하세요." />
          <Button type="submit" color="success" className="ml-4 h-14" variant="contained">
            검색
          </Button>
        </Form>
      )}
    </Formik>
  )
})

export default SearchUser

SearchUser.displayName = 'SearchUser'
