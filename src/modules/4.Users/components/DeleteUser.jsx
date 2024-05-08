import { useModal } from '../../../contexts/modalContext'
import { useUsers } from '../../../hooks/other'

import { DeleteData } from '../../../modules/shared'
import { Button, Modal } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'

const DeleteUser = () => {
  // Modal context
  const { isDeleteUserModalOpen, closeDeleteUserModal, actionUser } = useModal()
  // Recipes hook
  const { deleteUser } = useUsers()
  return (
    <Modal
      show={isDeleteUserModalOpen}
      onHide={closeDeleteUserModal}
      backdrop='static'
      keyboard={false}
      centered
    >
      <IoClose
        className='close-icon'
        onClick={() => {
          closeDeleteUserModal()
        }}
      />
      <Modal.Body
        style={{
          minHeight: '25vh',
        }}
        className='d-flex flex-column'
      >
        <h3>Delete Recipe</h3>
        {actionUser && (
          <>
            <DeleteData
              item='User'
              itemName={actionUser.userName}
              itemId={actionUser.id}
            />
            <div className='d-flex justify-content-between'>
              <Button variant='success' onClick={closeDeleteUserModal}>
                Cancel
              </Button>
              <Button
                variant='danger'
                onClick={() => {
                  deleteUser(actionUser.id)
                  closeDeleteUserModal()
                }}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default DeleteUser
