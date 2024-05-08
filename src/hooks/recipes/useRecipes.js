// Importing necessary modules
import { useContext } from 'react'
import { RecipesContext } from '../../contexts/recipesContext.jsx'
import { apiProtected } from '../../utils/api' // for making API calls
import { notify } from '../../utils/notify'

const useRecipes = () => {
  const { dispatch } = useContext(RecipesContext)

  // Defining the CRUD operations
  const getRecipes = async (
    pageNumber,
    pageSize,
    filter,
    categoryId,
    tagId
  ) => {
    try {
      dispatch({ type: 'GET_RECIPES' })
      const response = await apiProtected.get('/Recipe', {
        params: { pageNumber, pageSize, name: filter, categoryId, tagId },
      })
      dispatch({ type: 'GET_RECIPES_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'GET_RECIPES_FAILURE' })
      notify('error', `Error fetching recipes - ${error.response.data.message}`)
    }
  }

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }

  const setPagination = (pageNumber, pageSize) => {
    dispatch({ type: 'SET_PAGINATION', payload: { pageNumber, pageSize } })
  }

  const setCategoryFilter = (categoryId) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: categoryId })
  }

  const setTagFilter = (tagId) => {
    dispatch({ type: 'SET_TAG_FILTER', payload: tagId })
  }

  const addRecipe = async (newRecipeFormData) => {
    try {
      dispatch({ type: 'ADD_RECIPE' })
      const response = await apiProtected.post('/Recipe', newRecipeFormData)
      dispatch({ type: 'ADD_RECIPE_SUCCESS', payload: response.data })
      notify('success', 'Recipe added successfully')
    } catch (error) {
      dispatch({ type: 'ADD_RECIPE_FAILURE' })
      notify('error', `Error adding recipe - ${error.response.data.message}`)
    }
  }

  const updateRecipe = async (updatedRecipe, id) => {
    try {
      dispatch({ type: 'UPDATE_RECIPE' })
      const response = await apiProtected.put(
        `/Recipe/${id}`,
        updatedRecipe
      )
      notify('success', 'Recipe updated successfully')
      dispatch({ type: 'UPDATE_RECIPE_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'UPDATE_RECIPE_FAILURE' })
      notify('error', `Error updating recipe - ${error.response.data.message}`)
    }
  }

  const deleteRecipe = async (id) => {
    try {
      dispatch({ type: 'DELETE_RECIPE' })
      await apiProtected.delete(`/Recipe/${id}`)
      dispatch({ type: 'DELETE_RECIPE_SUCCESS', payload: id })
      notify('success', 'Recipe deleted successfully')
    } catch (error) {
      dispatch({ type: 'DELETE_RECIPE_FAILURE' })
      notify('error', `Error deleting recipe - ${error.response.data.message}`)
    }
  }

  const getRecipeById = async (id) => {
    try {
      dispatch({ type: 'GET_RECIPE_BY_ID' })
      const response = await apiProtected.get(`/Recipe/${id}`)
      // console.log('response', response)
      dispatch({ type: 'GET_RECIPE_BY_ID_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'GET_RECIPE_BY_ID_FAILURE' })
      notify('error', `Error fetching recipe - ${error.response.data.message}`)
    }
  }

  return {
    getRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    setFilter,
    setPagination,
    setCategoryFilter,
    setTagFilter,
    getRecipeById,
  }
}

export default useRecipes
