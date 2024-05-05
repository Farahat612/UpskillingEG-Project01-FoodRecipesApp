// react
import { useState } from 'react'
// react-router-dom
import { NavLink } from 'react-router-dom'
// context
import { useAuth } from '../../contexts/authContext'
// toast
import { toast } from 'react-toastify'

// react-pro-sidebar
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar'
// icons
import {
  FaHome,
  FaUser,
  FaUtensils,
  FaList,
  FaLock,
  FaSignOutAlt,
} from 'react-icons/fa'

// assets
import Togller from '../../assets/toggler.png'

const SideBar = () => {
  // Sidebar collapse state
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // logout functionality
  const { logout } = useAuth()
  const handleLogoutClick = () => {
    logout()
    toast.warn('Logged out successfully', { autoClose: 1500 })
  }
  return (
    <div className='sidebar-container'>
      <Sidebar
        collapsed={isCollapsed}
        collapsedWidth={'85px'}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#1f2632',
            color: '#d5dde6',
            height: '100vh',
            borderTopRightRadius: '50px',
            paddingBlock: '3rem',
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: 'rgba(47, 140, 96, 0.1)',
                color: '#fdfdfd',
                borderLeft: '5px solid green',
              },
            },
          }}
        >
          {/* Toggler */}
          <MenuItem
            id='toggler'
            style={{ marginBottom: '5rem' }}
            icon={
              <img
                src={Togller}
                alt='Toggler'
                width={isCollapsed ? 40 : 70}
                style={{
                  transition: 'all 0.3s ease',
                  transform: isCollapsed ? 'translatex(0)' : 'translatex(40px)',
                }}
              />
            }
            onClick={toggleCollapse}
          ></MenuItem>

          {/* Home */}
          <MenuItem icon={<FaHome />} component={<NavLink to='/' />}>
            {' '}
            Home
          </MenuItem>

          {/* Users */}
          <MenuItem icon={<FaUser />} component={<NavLink to='/users' />}>
            {' '}
            Users
          </MenuItem>

          {/* Categories */}
          <MenuItem icon={<FaList />} component={<NavLink to='/categories' />}>
            {' '}
            Categories
          </MenuItem>

          {/* Recipes */}
          <MenuItem icon={<FaUtensils />} component={<NavLink to='/recipes' />}>
            {' '}
            Recipes
          </MenuItem>

          {/* Change Password */}
          <MenuItem icon={<FaLock />}> Change Password</MenuItem>

          {/* Logout */}
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogoutClick}>
            {' '}
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideBar
