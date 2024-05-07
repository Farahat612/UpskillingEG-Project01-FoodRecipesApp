// Importing necessary modules
import { useContext } from 'react'
import { UsersContext } from '../../contexts/usersContext'
import { apiProtected } from '../../utils/api' // for making API calls
import { notify } from '../../utils/notify'

const useUsers = () => {
  const { dispatch } = useContext(UsersContext)

  // Defining the CRUD operations
  const getUsers = async (
    pageNumber,
    pageSize,
    userNameFilter,
    emailFilter,
    countryFilter,
    groupsFilter
  ) => {
    try {
      dispatch({ type: 'GET_USERS' })
      const response = await apiProtected.get('/User', {
        params: {
          pageNumber,
          pageSize,
          userNameFilter,
          emailFilter,
          countryFilter,
          groupsFilter,
        },
      })
      dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'GET_USERS_FAILURE' })
      notify('error', `Error fetching users - ${error.response.data.message}`)
    }
  }

  const setUserNameFilter = (userNameFilter) => {
    dispatch({ type: 'SET_USERNAME_FILTER', payload: userNameFilter })
  }

  const setEmailFilter = (emailFilter) => {
    dispatch({ type: 'SET_EMAIL_FILTER', payload: emailFilter })
  }

  const setCountryFilter = (countryFilter) => {
    dispatch({ type: 'SET_COUNTRY_FILTER', payload: countryFilter })
  }

  const setGroupsFilter = (groupsFilter) => {
    dispatch({ type: 'SET_GROUPS_FILTER', payload: groupsFilter })
  }

  const setPagination = (pageNumber, pageSize) => {
    dispatch({ type: 'SET_PAGINATION', payload: { pageNumber, pageSize } })
  }

  const deleteUser = async (id) => {
    try {
      dispatch({ type: 'DELETE_USER' })
      await apiProtected.delete(`/User/${id}`)
      notify('success', 'User deleted successfully')
      dispatch({ type: 'DELETE_USER_SUCCESS', payload: id })
    } catch (error) {
      dispatch({ type: 'DELETE_USER_FAILURE' })
      notify('error', `Error deleting user - ${error.response.data.message}`)
    }
  }

  return {
    getUsers,
    setUserNameFilter,
    setEmailFilter,
    setCountryFilter,
    setGroupsFilter,
    setPagination,
    deleteUser,
  }
}

export default useUsers
