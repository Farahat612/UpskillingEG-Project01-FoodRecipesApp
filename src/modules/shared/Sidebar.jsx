/* eslint-disable no-unused-vars */
// react
import { useState, useEffect } from 'react'
// react-router-dom
import { NavLink } from 'react-router-dom'
// contexts
import { useAuth } from '../../contexts/authContext'
import { useModal } from '../../contexts/modalContext'
// toast
import { toast } from 'react-toastify'
// react-pro-sidebar
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar'
// icons
import {
  FaHome,
  FaUser,
  FaList,
  FaLock,
  FaSignOutAlt,
  FaRegHeart,
} from 'react-icons/fa'
import { HiTemplate } from 'react-icons/hi'
// components
import { GlobalModal } from '.'
import { ChangePass } from '../1.Authentication'

// assets
import Togller from '../../assets/toggler.png'

const SideBar = () => {
  // Sidebar collapse state
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // logout functionality
  const { logout, userType } = useAuth()
  const handleLogoutClick = () => {
    logout()
    toast.warn('Logged out successfully', { autoClose: 1500 })
  }

  // modal context
  const { openModal } = useModal()

  // Meny Items display based on user type
  const AdminMenuItemVisibilityStyle = {
    display: userType === 'SuperAdmin' ? 'flex' : 'none',
  }
  const UserMenuItemVisibilityStyle = {
    display: userType === 'SystemUser' ? 'flex' : 'none',
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
          <MenuItem
            style={AdminMenuItemVisibilityStyle}
            icon={<FaUser />}
            component={<NavLink to='/users' />}
          >
            {' '}
            Users
          </MenuItem>

          {/* Categories */}
          <MenuItem
            style={AdminMenuItemVisibilityStyle}
            icon={<FaList />}
            component={<NavLink to='/categories' />}
          >
            {' '}
            Categories
          </MenuItem>

          {/* Recipes */}
          <MenuItem icon={<HiTemplate />} component={<NavLink to='/recipes' />}>
            {' '}
            Recipes
          </MenuItem>

          {/* Favourites */}
          <MenuItem
            style={UserMenuItemVisibilityStyle}
            icon={<FaRegHeart />}
            component={<NavLink to='/userFavourites' />}
          >
            {' '}
            Favourites
          </MenuItem>

          {/* Change Password */}
          <MenuItem icon={<FaLock />} onClick={openModal}>
            {' '}
            Change Password
          </MenuItem>

          {/* Logout */}
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogoutClick}>
            {' '}
            Logout
          </MenuItem>
        </Menu>

        {/* Change Password Modal */}
        <GlobalModal>
          <ChangePass />
        </GlobalModal>
      </Sidebar>
    </div>
  )
}

export default SideBar
