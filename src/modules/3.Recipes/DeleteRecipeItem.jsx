import { useModal } from '../../contexts/modalContext'
import { useRecipes } from '../../hooks/recipes'

import { DeleteData } from '../../components/shared'
import { Button, Modal } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'

const DeleteRecipeItem = () => {
  // Modal context
  const { isDeleteModalOpen, closeDeleteModal, actionRecipe } = useModal()
  // Recipes hook
  const { deleteRecipe } = useRecipes()
  return (
    <Modal
      show={isDeleteModalOpen}
      onHide={closeDeleteModal}
      backdrop='static'
      keyboard={false}
      centered
    >
      <IoClose
        className='close-icon'
        onClick={() => {
          closeDeleteModal()
        }}
      />
      <Modal.Body
        style={{
          minHeight: '25vh',
        }}
        className='d-flex flex-column'
      >
        <h3>Delete Recipe</h3>
        {actionRecipe && (
          <>
            <DeleteData
              item='Recipe'
              itemName={actionRecipe.name}
              itemId={actionRecipe.id}
            />
            <div className='d-flex justify-content-between'>
              <Button variant='success' onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button
                variant='danger'
                onClick={() => {
                  deleteRecipe(actionRecipe.id)
                  closeDeleteModal()
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

export default DeleteRecipeItem
