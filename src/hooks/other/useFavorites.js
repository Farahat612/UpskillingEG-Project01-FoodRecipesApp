// Importing necessary modules
import { useContext } from 'react'
import { FavoritesContext } from '../../contexts/modules/favoritesContext'
import { apiProtected } from '../../utils/api' // for making API calls
import { notify } from '../../utils/notify'

const useFavorites = () => {
  const { dispatch } = useContext(FavoritesContext)

  // Defining the CRUD operations
  const getFavorites = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get('/userRecipe')
      dispatch({ type: 'GET_FAVORITES_SUCCESS', payload: response.data.data })
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
      notify(
        'error',
        `Error fetching favorites - ${error.response.data.message}`
      )
    }
  }

  const addToFavorites = async (recipeId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.post('/userRecipe', { recipeId })
      dispatch({ type: 'ADD_TO_FAVORITES_SUCCESS', payload: response.data })
      notify('success', 'Recipe added to favorites successfully')
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
      notify(
        'error',
        `Error adding recipe to favorites - ${error.response.data.message}`
      )
    }
  }

  const removeFromFavorites = async (favoriteId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await apiProtected.delete(`/userRecipe/${favoriteId}`)
      dispatch({ type: 'REMOVE_FROM_FAVORITES_SUCCESS', payload: favoriteId })
      notify('success', 'Recipe removed from favorites successfully')
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
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
