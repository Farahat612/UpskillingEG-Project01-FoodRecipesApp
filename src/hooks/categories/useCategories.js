// Importing necessary modules
import { useContext } from 'react'
import { CategoriesContext } from '../../contexts/categoriesContext.jsx'
import { apiProtected } from '../../utils/api.js' // for making API calls
import { notify } from '../../utils/notify.js'

const useCategories = () => {
  const { dispatch } = useContext(CategoriesContext)

  // Defining the CRUD operations
  const getCategories = async (pageNumber, pageSize, filter) => {
    try {
      dispatch({ type: 'GET_CATEGORIES' })
      const response = await apiProtected.get('/Category', {
        params: { pageNumber, pageSize, name: filter },
      })
      dispatch({ type: 'GET_CATEGORIES_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'GET_CATEGORIES_FAILURE' })
      notify(
        'error',
        `Error fetching categories - ${error.response.data.message}`
      )
    }
  }
  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }
  const setPagination = (pageNumber, pageSize) => {
    dispatch({ type: 'SET_PAGINATION', payload: { pageNumber, pageSize } })
  }

  const addCategory = async (newCategory) => {
    try {
      dispatch({ type: 'ADD_CATEGORY' })
      const response = await apiProtected.post('/Category', newCategory)
      dispatch({ type: 'ADD_CATEGORY_SUCCESS', payload: response.data })
      notify('success', 'Category added successfully')
    } catch (error) {
      dispatch({ type: 'ADD_CATEGORY_FAILURE' })
      notify('error', `Error adding category - ${error.response.data.message}`)
    }
  }

  const updateCategory = async (updatedCategory) => {
    try {
      dispatch({ type: 'UPDATE_CATEGORY' })
      const response = await apiProtected.put(
        `Category/${updatedCategory.id}`,
        updatedCategory
      )
      dispatch({ type: 'UPDATE_CATEGORY_SUCCESS', payload: response.data })
      notify('success', 'Category updated successfully')
    } catch (error) {
      dispatch({ type: 'UPDATE_CATEGORY_FAILURE' })
      notify(
        'error',
        `Error updating category - ${error.response.data.message}`
      )
    }
  }

  const deleteCategory = async (id) => {
    try {
      dispatch({ type: 'DELETE_CATEGORY' })
      await apiProtected.delete(`Category/${id}`)
      dispatch({ type: 'DELETE_CATEGORY_SUCCESS', payload: id })
      notify('success', 'Category deleted successfully')
    } catch (error) {
      dispatch({ type: 'DELETE_CATEGORY_FAILURE' })
      notify(
        'error',
        `Error deleting category - ${error.response.data.message}`
      )
    }
  }

  return {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    setFilter,
    setPagination,
  }
}

export default useCategories
