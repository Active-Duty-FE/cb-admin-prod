import { useEffect, useState } from 'react'
type Device = {
  type: 'mobile' | 'pc'
  innerWidth: number
}
export const useDevice = () => {
  const [device, setDevice] = useState<Device>()
  useEffect(() => {
    const innerWidth = window.innerWidth
    if (innerWidth <= 820) {
      setDevice({
        type: 'mobile',
        innerWidth
      })
    } else {
      setDevice({
        type: 'pc',
        innerWidth
      })
    }
  }, [])
  return device
}
