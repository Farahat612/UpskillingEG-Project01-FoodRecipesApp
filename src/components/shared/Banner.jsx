import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Banner = ({ buttonTitle, buttonDestination, children }) => {
  const navigate = useNavigate()
  return (
    <div className='d-flex align-items-center home-banner'>
      <div className='content w-75'>{children}</div>

      <div className='button'>
        <Button
          variant='success'
          className='btn btn-success px-4 d-flex align-items-center gap-3'
          id='add-category'
          onClick={() => navigate(`${buttonDestination}`)}
        >
          {buttonTitle}
          <i className='fas fa-arrow-right d-inline-block'></i>
        </Button>
      </div>
    </div>
  )
}

export default Banner

Banner.propTypes = {
  children: PropTypes.node,
  buttonTitle: PropTypes.string.isRequired,
  buttonDestination: PropTypes.string.isRequired,
}
