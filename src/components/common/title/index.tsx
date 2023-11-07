import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  className?: string
}

const Title: FC<IProps> = memo(({ children, className }) => {
  return <h2 className={`text-lg md:text-2xl text-stone-700 mt-0 ${className}`}>{children}</h2>
})

export default Title

Title.displayName = 'Title'
