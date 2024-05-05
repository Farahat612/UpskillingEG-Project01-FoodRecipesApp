import { useForm } from 'react-hook-form'
import { useModal } from '../../contexts/modalContext'
import { useCategories } from '../../hooks/categories'
import PropTypes from 'prop-types'

import { DeleteData } from '../shared'
import { Form, Button, Modal } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'

const CategoryForm = ({ type, actionCategory }) => {
  // Modal context
  const { isCategoryModalOpen, closeCategoryModal } = useModal()
  // Categories hooks
  const { addCategory, updateCategory, deleteCategory } = useCategories()
  // Form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    if (type === 'add') {
      addCategory(data)
    } else if (type === 'edit') {
      updateCategory({ ...data, id: actionCategory.id })
    }
    closeCategoryModal()
  }
  return (
    <Modal
      show={isCategoryModalOpen}
      onHide={closeCategoryModal}
      backdrop='static'
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>
          {type === 'add'
            ? 'Add Category'
            : type === 'edit'
            ? 'Edit Category'
            : 'Delete Category'}
        </Modal.Title>
      </Modal.Header>
      <IoClose className='close-icon' onClick={closeCategoryModal} />
      <Modal.Body
        style={{
          minHeight: '25vh',
        }}
      >
        {type === 'add' || type === 'edit' ? (
          <Form onSubmit={handleSubmit(onSubmit)} className='h-75'>
            <Form.Group className='mb-5' controlId='exampleForm.ControlInput1'>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ex: Pasta'
                autoFocus
                {...register('name', { required: 'Name is required' })}
                defaultValue={
                  type == 'edit' && actionCategory ? actionCategory.name : ''
                }
              />
              {errors.name && (
                <div className='alert alert-danger mt-2 py-1 '>
                  {errors.name.message}
                </div>
              )}
            </Form.Group>
            <div className='border-top'>
              <Button
                type='submit'
                variant='success'
                className='mt-3 d-block ms-auto px-4 '
              >
                {type === 'add' ? 'Add' : 'Edit'}
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <DeleteData
              item='Category'
              itemName={actionCategory.name}
              itemId={actionCategory.id}
            />
            <div className='d-flex justify-content-between'>
              <Button variant='success' onClick={closeCategoryModal}>
                Cancel
              </Button>
              <Button
                variant='danger'
                onClick={() => {
                  deleteCategory(actionCategory.id)
                  closeCategoryModal()
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

export default CategoryForm

CategoryForm.propTypes = {
  type: PropTypes.string.isRequired,
  actionCategory: PropTypes.object,
}
