// Importing necessary modules
import { useContext } from 'react'
import { CategoriesContext } from '../../contexts/categoriesContext.jsx'
import { apiProtected } from '../../utils/api.js' // for making API calls

const useCategories = () => {
  const { dispatch } = useContext(CategoriesContext)

  // Defining the CRUD operations
  const getCategories = async () => {
    try {
      dispatch({ type: 'GET_CATEGORIES' }) // Dispatch action to set loading to true
      const response = await apiProtected.get('/Category')
      dispatch({ type: 'GET_CATEGORIES_SUCCESS', payload: response.data.data }) // Dispatch action on successful fetch
    } catch (error) {
      dispatch({ type: 'GET_CATEGORIES_FAILURE' }) // Dispatch action if fetch fails
      console.error('Error fetching categories:', error)
    }
  }

  const addCategory = async (newCategory) => {
    try {
      dispatch({ type: 'ADD_CATEGORY' }) // Dispatch action to set loading to true
      const response = await apiProtected.post('/Category', newCategory)
      dispatch({ type: 'ADD_CATEGORY_SUCCESS', payload: response.data }) // Dispatch action on successful addition
    } catch (error) {
      dispatch({ type: 'ADD_CATEGORY_FAILURE' }) // Dispatch action if addition fails
      console.error('Error adding category:', error)
    }
  }

  const updateCategory = async (updatedCategory) => {
    try {
      dispatch({ type: 'UPDATE_CATEGORY' }) // Dispatch action to set loading to true
      const response = await apiProtected.put(
        `Category/${updatedCategory.id}`,
        updatedCategory
      )
      dispatch({ type: 'UPDATE_CATEGORY_SUCCESS', payload: response.data }) // Dispatch action on successful update
    } catch (error) {
      dispatch({ type: 'UPDATE_CATEGORY_FAILURE' }) // Dispatch action if update fails
      console.error('Error updating category:', error)
    }
  }

  const deleteCategory = async (id) => {
    try {
      dispatch({ type: 'DELETE_CATEGORY' }) // Dispatch action to set loading to true
      await apiProtected.delete(`Category/${id}`)
      dispatch({ type: 'DELETE_CATEGORY_SUCCESS', payload: id }) // Dispatch action on successful deletion
    } catch (error) {
      dispatch({ type: 'DELETE_CATEGORY_FAILURE' }) // Dispatch action if deletion fails
      console.error('Error deleting category:', error)
    }
  }

  return { getCategories, addCategory, updateCategory, deleteCategory }
}
// Step 5: Export the hook
export default useCategories
