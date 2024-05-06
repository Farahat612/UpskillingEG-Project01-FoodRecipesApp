import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import PropTypes from 'prop-types'
import { useModal } from '../../contexts/modalContext'

const Banner = ({ buttonTitle, buttonDestination, children, btnId }) => {
  const navigate = useNavigate()
  const { openCategoryModal, setType } = useModal()
  return (
    <div className='d-flex align-items-center home-banner'>
      <div className='content w-75'>{children}</div>

      <div className='button'>
        {buttonTitle && (
          <Button
            variant='success'
            className='btn btn-success px-4 d-flex align-items-center gap-3'
            id={btnId}
            onClick={
              buttonDestination
                ? () => navigate(buttonDestination)
                : btnId === 'add-category'
                ? () => {
                    openCategoryModal()
                    setType('add')
                  }
                : null
            }
          >
            {buttonTitle}
            <FaArrowRight className='pe-none' />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Banner

Banner.propTypes = {
  children: PropTypes.node,
  buttonTitle: PropTypes.string,
  buttonDestination: PropTypes.string,
  btnId: PropTypes.string,
}
