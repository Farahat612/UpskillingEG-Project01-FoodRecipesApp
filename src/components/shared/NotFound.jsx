import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notFound-container'>
      <div className='logo'>
        <img src={Logo} alt='Logo' width={220} />
      </div>

      <div className='notFound'>
        <h1>Oops...</h1>
        <h5 className='text-success'>404 - Page not found</h5>
        <p>
          The page might have been removed.
          <br />
          We recommend you to go back to the home page.
        </p>

        <Link
          to='/dashboard'
          className='btn btn-success px-5 d-flex align-items-center gap-3'
        >
          <i className='fas fa-arrow-left d-inline-block'></i>
          <span>Back To Home</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
