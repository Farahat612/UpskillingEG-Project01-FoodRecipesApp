// Importing necessary modules
import { useContext } from 'react'
import { FavoritesContext } from '../../contexts/favoritesContext'
import { apiProtected } from '../../utils/api' // for making API calls
import { notify } from '../../utils/notify'

const useFavorites = () => {
  const { dispatch } = useContext(FavoritesContext)

  // Defining the CRUD operations
  const getFavorites = async () => {
    try {
      dispatch({ type: 'GET_FAVORITES' })
      const response = await apiProtected.get('/userRecipe')
      dispatch({ type: 'GET_FAVORITES_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'GET_FAVORITES_FAILURE' })
      notify(
        'error',
        `Error fetching favorites - ${error.response.data.message}`
      )
    }
  }

  const addToFavorites = async (recipeId) => {
    try {
      dispatch({ type: 'ADD_TO_FAVORITES' })
      const response = await apiProtected.post('/userRecipes', { recipeId })
      dispatch({ type: 'ADD_TO_FAVORITES_SUCCESS', payload: response.data })
      notify('success', 'Recipe added to favorites successfully')
    } catch (error) {
      dispatch({ type: 'ADD_TO_FAVORITES_FAILURE' })
      notify(
        'error',
        `Error adding recipe to favorites - ${error.response.data.message}`
      )
    }
  }

  const removeFromFavorites = async (recipeId) => {
    try {
      dispatch({ type: 'REMOVE_FROM_FAVORITES' })
      await apiProtected.delete(`/userRecipes/${recipeId}`)
      dispatch({ type: 'REMOVE_FROM_FAVORITES_SUCCESS', payload: recipeId })
      notify('success', 'Recipe removed from favorites successfully')
    } catch (error) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES_FAILURE' })
      notify(
        'error',
        `Error removing recipe from favorites - ${error.response.data.message}`
      )
    }
  }

  return {
    getFavorites,
    addToFavorites,
    removeFromFavorites,
  }
}

export default useFavorites
