import nodataImg from '../../assets/images/no-data.png'
import PropTypes from 'prop-types'

const DeleteData = ({ item, itemName, itemId }) => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5'>
      <img src={nodataImg} alt='Delete Data' />
      <h3>Delete {item} ?</h3>
      <p>
        Are you sure you want to delete{' '}
        <strong className='text-success'>{itemName}</strong> {item} with ID{' '}
        <strong className='text-success'> {itemId} </strong>?!
      </p>
    </div>
  )
}

export default DeleteData

DeleteData.propTypes = {
  item: PropTypes.string.isRequired,
  itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  itemName: PropTypes.string.isRequired,
}
