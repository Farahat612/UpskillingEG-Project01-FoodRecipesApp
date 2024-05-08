import PropTypes from 'prop-types'

const Header = ({ title, description, imgUrl }) => {
  return (
    <>
      <div className='header-container '>
        <div className='row align-items-center p-0'>
          <div className='col-md-8'>
            <div className='content'>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className='col-md-4 text-center'>
            <img src={imgUrl} alt='' className='header-img' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header


Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
}
