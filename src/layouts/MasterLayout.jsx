import PropTypes from 'prop-types'
import { SideBar } from '../components/shared'
const MasterLayout = ({ children }) => {
  return (
    <div className=' p-0'>
      <div className='d-flex'>
        <div>
          <SideBar />
        </div>
        <div className='master w-100'>
          Navbar here
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
