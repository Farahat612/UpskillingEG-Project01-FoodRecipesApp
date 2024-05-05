// Imports
import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'
import categoriesReducer from './categoriesReducer'

// Creating the context
export const CategoriesContext = createContext()

// Defining the provider component
export const CategoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoriesReducer, {
    categories: [],
    loading: false,
  })

  return (
    <CategoriesContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoriesContext.Provider>
  )
}

// proptypes
CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
