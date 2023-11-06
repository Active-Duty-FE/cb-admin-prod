import Header from '../../components/layout/header'
import Siderbar from '../../components/layout/siderbar'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Tutorial from '@/components/tutorial'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useDevice } from '@/hooks/user-interface'
import { updateSidebarToggled } from '@/store/modules/user-interface'
import { getUserInterface } from '@/utils/localstorage'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'

function Layout() {
  const [paddingLeft, setPaddingLeft] = useState<number>(250)
  const tips = getUserInterface('tips')
  const device = useDevice()
  const dispatch = useAppDispatch()
  const pathname = useLocation().pathname
  const getTipReset = createSelector(
    (state: RootState) => state.userInterface.tipReset,
    (tipReset) => tipReset
  )
  const tipReset = useAppSelector(getTipReset)

  useEffect(() => {
    if (device?.type === 'pc') {
      dispatch(updateSidebarToggled(true))
    }
  }, [device?.type, dispatch])

  return (
    <div className="relative">
      <Header />
      <div className="fixed left-0 top-16 z-10">
        <Siderbar setPaddingLeft={setPaddingLeft} pathname={pathname} />
      </div>
      <div className={`pt-16 duration-500 pl-${paddingLeft}`}>
        <div className="p-2 md:p-7">
          <Outlet />
        </div>
      </div>
      {tips === '0' && <Tutorial tipReset={tipReset} />}
    </div>
  )
}

export default Layout
