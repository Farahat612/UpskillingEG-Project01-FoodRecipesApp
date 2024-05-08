import { useAuth } from '../../contexts/global/authContext'
import { FaBell, FaSearch, FaChevronDown } from 'react-icons/fa'
import Avatar from '../../assets/avatar.png'

const Navbar = () => {
  // context
  const { user } = useAuth()
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light rounded rounded-3 px-3'>
        <div className='container-fluid'>
          <div className='d-flex justify-content-center'>
            <div className='input-group rounded'>
              <span className='input-group-text'>
                <FaSearch />
              </span>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search Here'
                aria-label='Search'
                style={{ width: '300px' }}
              />
            </div>
          </div>
          <div className='d-flex'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row align-items-center gap-3'>
              <li>
                <img src={Avatar} height='50' alt='Avatar' />
                <span>{user?.userName}</span>
              </li>

              <li className='nav-item'>
                <FaChevronDown />
              </li>
              <li>
                <FaBell />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
