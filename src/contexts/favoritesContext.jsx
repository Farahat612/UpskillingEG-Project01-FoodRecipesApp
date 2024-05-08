// Imports
import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'
import favoritesReducer from './favoritesReducer'

// Creating the context
export const FavoritesContext = createContext()

// Defining the provider component
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: [],
    loading: false,
  })

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// proptypes
FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
