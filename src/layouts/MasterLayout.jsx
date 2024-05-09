import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/global/authContext'
import { SideBar, Navbar } from '../modules/shared'

const MasterLayout = ({ children }) => {
  const { saveUserType } = useContext(AuthContext)

  useEffect(() => {
    saveUserType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className=' p-0'>
      <div className='d-flex'>
        <div>
          <SideBar />
        </div>
        <div className='master w-100'>
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
}

export default MasterLayout

MasterLayout.propTypes = {
  children: PropTypes.node,
}
