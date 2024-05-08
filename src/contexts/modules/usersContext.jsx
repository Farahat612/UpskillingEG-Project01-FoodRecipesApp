// Imports
import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'
import usersReducer from './usersReducer'

// Creating the context
export const UsersContext = createContext()

// Defining the provider component
export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: [],
    currentUser: {},
    loading: false,
    pageNumber: 1,
    pageSize: 10,
    userName: '',
    email: '',
    country: '',
    groups: '',
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  })

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}

// proptypes
UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
