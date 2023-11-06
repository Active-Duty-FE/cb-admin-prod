import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import DescItem from './desc-item'
import Slider, { Settings } from 'react-slick'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { useAppDispatch } from '@/hooks/store'
import { updateTipReset } from '@/store/modules/user-interface'
import { data } from './data'
import { setUserInterface } from '@/utils/localstorage'

interface IProps {
  children?: ReactNode
  setOpen: (open: boolean) => void
}

const sliderSetting: Settings = {
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
    setUserInterface('tips', '1')
    setOpen(false)
    appDispatch(updateTipReset(false))
    document.body.style.overflow = 'auto'
  }
  return (
    <div className="w-full">
      <div className="md:relative w-full md:w-[500px] m-auto px-[10%] md:px-0 box-border">
        <h2 className="text-white">Tips!</h2>
        <Slider
          ref={sliderRef}
          {...sliderSetting}
          className="md:w-500 w-9/12"
          afterChange={(i) => handleSliderChange(i)}
        >
          {data.map((item) => (
            <DescItem item={item} />
          ))}
        </Slider>
        <div className="fixed sm:absolute md:-right-32 md:top-0 right-[3%] top-[3%]">
          {sliderIndex !== 0 && (
            <Button color="success" variant="contained" onClick={() => sliderRef.current?.slickPrev()}>
              이전
            </Button>
          )}
          {sliderIndex === data.length - 1 ? (
            <Button color="success" variant="contained" onClick={handleClose}>
              닫기
            </Button>
          ) : (
            <Button color="success" variant="contained" onClick={() => sliderRef.current?.slickNext()}>
              다음
            </Button>
          )}
        </div>
      </div>
    </div>
  )
})

export default Item

Item.displayName = 'Item'
