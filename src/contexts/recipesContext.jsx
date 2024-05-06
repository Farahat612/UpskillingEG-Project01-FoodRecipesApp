// Imports
import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'
import recipesReducer from './recipesReducer'

// Creating the context
export const RecipesContext = createContext()

// Defining the provider component
export const RecipesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, {
    recipes: [],
    loading: false,
    pageNumber: 1,
    pageSize: 10,
    filter: '',
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
    selectedCategoryId: null,
    selectedTagId: null,
  })

  return (
    <RecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  )
}

// proptypes
RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
