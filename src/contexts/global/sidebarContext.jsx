import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const SidebarContext = createContext()

const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
