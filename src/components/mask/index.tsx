import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

const Mask: FC<IProps> = memo(({ children, open, setOpen }) => {
  return (
    <div
      className={`fixed left-0 top-0 w-screen h-screen z-30 flex justify-center items-center bg-stone-900/50 overflow-scroll md:overflow-auto ${
        !open && 'hidden'
      }`}
    >
      {children}
      <div
        className="absolute right-10 top-10 flex justify-center items-center cursor-pointer hover:animate-spin"
        onClick={() => setOpen(false)}
      ></div>
    </div>
  )
})

export default Mask

Mask.displayName = 'Mask'
