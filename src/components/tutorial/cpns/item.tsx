import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import DescItem from './desc-item'
import Slider, { Settings } from 'react-slick'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { useAppDispatch } from '@/hooks/store'
import { updateTipReset } from '@/store/modules/user-interface'
import { data } from './data'

interface IProps {
  children?: ReactNode
  setOpen: (open: boolean) => void
}

const settings: Settings = {
  arrows: false,
  speed: 0,
  infinite: false,
  swipe: false
}
const StyledButton = styled(Button)`
  border-color: #d3d3d3;
  color: #d3d3d3;
  &:hover {
    border-color: #fff;
    color: #fff;
  }
`
const Item: FC<IProps> = memo(({ setOpen }) => {
  const [sliderIndex, setSliderIndex] = useState(0)
  const sliderRef = useRef<Slider>(null)
  const appDispatch = useAppDispatch()
  useEffect(() => {}, [sliderIndex])
  const handleSliderChange = (index: number) => {
    setSliderIndex(index)
  }
  const handleClose = () => {
    localStorage.setItem('tips', 'watched')
    setOpen(false)
    appDispatch(updateTipReset(false))
    document.body.style.overflow = 'auto'
  }
  return (
    <div className="w-full">
      <div className="md:relative static w-full md:w-[500px] m-auto px-[10%] md:px-0">
        <h2 className="text-sky-600">Tips!</h2>
        <Slider ref={sliderRef} {...settings} className="md:w-500 w-9/12" afterChange={(i) => handleSliderChange(i)}>
          {data.map((item) => (
            <DescItem item={item} />
          ))}
        </Slider>
        <div className="absolute md:-right-32 md:top-0 right-[5%] top-[5%]">
          {sliderIndex !== 0 && (
            <StyledButton variant="outlined" onClick={() => sliderRef.current?.slickPrev()}>
              이전
            </StyledButton>
          )}
          {sliderIndex === data.length - 1 ? (
            <StyledButton variant="outlined" onClick={handleClose}>
              닫기
            </StyledButton>
          ) : (
            <StyledButton variant="outlined" onClick={() => sliderRef.current?.slickNext()}>
              다음
            </StyledButton>
          )}
        </div>
      </div>
    </div>
  )
})

export default Item

Item.displayName = 'Item'
