import { useModal } from '../../contexts/global/modalContext'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'

const GlobalModal = ({ children }) => {
  const { isModalOpen, closeModal } = useModal()
  return (
    <Modal
      show={isModalOpen}
      onHide={closeModal}
      backdrop='static'
      keyboard={false}
      centered
    >
      <IoClose className='close-icon' onClick={closeModal} />
      <Modal.Body
        style={{
          minHeight: '25vh',
        }}
      >
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default GlobalModal

GlobalModal.propTypes = {
  children: PropTypes.node,
}
