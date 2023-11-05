import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Title: FC<IProps> = memo(({ children }) => {
  return <h2 className="text-lg md:text-2xl text-primary">{children}</h2>
})

export default Title

Title.displayName = 'Title'
