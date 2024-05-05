// Importing necessary modules
import { useContext } from 'react'
import { CategoriesContext } from '../../contexts/categoriesContext.jsx'
import { apiProtected } from '../../utils/api.js' // for making API calls

const useCategories = () => {
  const { dispatch } = useContext(CategoriesContext)

  // Defining the CRUD operations
  const getCategories = async () => {
    const response = await apiProtected.get('/Category')
    console.log(response.data)
    dispatch({ type: 'GET_CATEGORIES', payload: response.data.data })
  }

  const addCategory = async (newCategory) => {
    const response = await apiProtected.post('/Category', newCategory)
    dispatch({ type: 'ADD_CATEGORY', payload: response.data })
  }

  const updateCategory = async (updatedCategory) => {
    const response = await apiProtected.put(
      `Category/${updatedCategory.id}`,
      updatedCategory
    )
    dispatch({ type: 'UPDATE_CATEGORY', payload: response.data })
  }

  const deleteCategory = async (id) => {
    await apiProtected.delete(`Category/${id}`)
    dispatch({ type: 'DELETE_CATEGORY', payload: id })
  }

  return { getCategories, addCategory, updateCategory, deleteCategory }
}
// Step 5: Export the hook
export default useCategories
