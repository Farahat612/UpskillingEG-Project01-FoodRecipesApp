import PropTypes from 'prop-types'

import nodataImg from '../../assets/images/no-data.png'
import { staticURL } from '../../utils/api'

const TableImg = ({ path, altTxt, fit }) => {
  return (
    <img
      src={path ? `${staticURL}/${path}` : nodataImg}
      alt={path ? altTxt : 'No Data Available'}
      className='img-fluid '
      style={{
        width: '70px',
        height: '40px',
        objectFit: fit || 'contain',
      }}
    />
  )
}

export default TableImg

TableImg.propTypes = {
  path: PropTypes.string,
  altTxt: PropTypes.string.isRequired,
  fit: PropTypes.string,
}
