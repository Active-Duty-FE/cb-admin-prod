import { menuItem } from '@/data'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useDevice } from '@/hooks/user-interface'
import { updateSidebarToggled } from '@/store/modules/user-interface'
import { MenuItemType } from '@/types'
import { getUserInterface, setUserInterface } from '@/utils/localstorage'
import { FC, Fragment, useEffect, useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { NavLink } from 'react-router-dom'

interface IProps {
  setPaddingLeft?: (paddingLeft: number) => void
  pathname?: string
}

const Siderbar: FC<IProps> = (props) => {
  const { setPaddingLeft, pathname } = props
  const device = useDevice()
  const [collapsed, setCollapsed] = useState(getUserInterface('sidebarCollapsed') === 1 ? true : false)
  const dispatch = useAppDispatch()
  const { sidebarToggled } = useAppSelector((state) => ({ sidebarToggled: state.userInterface.sidebarToggled }))
  useEffect(() => {
    if (setPaddingLeft) {
      if (device?.type === 'pc') {
        if (collapsed) {
          setPaddingLeft(81)
        } else {
          setPaddingLeft(250)
        }
      } else {
        setPaddingLeft(0)
      }
    }
  }, [collapsed, setPaddingLeft, device?.type])
  useEffect(() => {
    if (device?.type === 'mobile') {
      setCollapsed(true)
      setUserInterface('sidebarCollapsed', '1')
    }
  }, [device?.type])
  const getDefaultOpen = (item: MenuItemType) => {
    if (item.children) {
      return item.children.map((item) => item.to).includes(pathname)
    }
  }
  const handleCollapseButton = () => {
    setCollapsed && setCollapsed(!collapsed)
    setUserInterface('sidebarCollapsed', collapsed ? '0' : '1')
  }
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      <Sidebar
        collapsed={collapsed}
        backgroundColor="#313743"
        breakPoint="md"
        toggled={sidebarToggled}
        transitionDuration={500}
        onBackdropClick={() => dispatch(updateSidebarToggled(false))}
      >
        <div className="h-4 bg-[#4A5064] text-center text-[#313743] py-2 cursor-pointer" onClick={handleCollapseButton}>
          | | |
        </div>
        <Menu
          closeOnClick={true}
          rootStyles={{
            color: '#fff',
            fontSize: '14px',
            '.ps-menu-button': {
              backgroundColor: '#313743',
              ':hover': {
                backgroundColor: '#272c36'
              }
            },
            '.active': {
              color: '#409fff!important',
              backgroundColor: '#272c36'
            }
          }}
        >
          {menuItem.map((item) => {
            return (
              <Fragment key={item.label}>
                {item.children ? (
                  <SubMenu defaultOpen={getDefaultOpen(item)} key={item.label} icon={item.icon} label={item.label}>
                    {item.children.map((itemI) => (
                      <MenuItem
                        key={itemI.label}
                        icon={itemI.icon}
                        component={
                          itemI.to && (
                            <NavLink className="text-white" to={itemI.to}>
                              {itemI.label}
                            </NavLink>
                          )
                        }
                      >
                        {itemI.label}
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                    key={item.label}
                    icon={item.icon}
                    component={
                      item.to && (
                        <NavLink className="text-white" to={item.to}>
                          {item.label}
                        </NavLink>
                      )
                    }
                  >
                    {item.label}
                  </MenuItem>
                )}
              </Fragment>
            )
          })}
        </Menu>
      </Sidebar>
    </div>
  )
}

export default Siderbar
