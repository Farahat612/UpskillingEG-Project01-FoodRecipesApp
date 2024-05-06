/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

// Create the modal context
export const ModalContext = createContext()

// Create the modal provider component
const ModalProvider = ({ children }) => {
  // Change Password Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true)
  }
  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Category Actions Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [type, setType] = useState('add')
  const [actionCategory, setActionCategory] = useState(null)
  // Function to open the modal
  const openCategoryModal = () => {
    setIsCategoryModalOpen(true)
  }
  // Function to close the modal
  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false)
  }

  // Delete Recipe Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [actionRecipe, setActionRecipe] = useState(null)
  // Function to open the modal
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }
  // Function to close the modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  // Provide the modal state and functions to the children components
  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        isCategoryModalOpen,
        openCategoryModal,
        closeCategoryModal,
        type,
        setType,
        actionCategory,
        setActionCategory,
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        actionRecipe,
        setActionRecipe,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

ModalProvider.propTypes = {
  children: PropTypes.node,
}
