// Imports
import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'
import { apiProtected } from '../../utils/api'
import { notify } from '../../utils/notify'

// Creating the context
export const TagsContext = createContext()

// Defining the provider component
export const TagsProvider = ({ children }) => {
  const [state, setState] = useState({
    tags: [],
    loading: false,
  })

  useEffect(() => {
    const fetchTags = async () => {
      setState({ ...state, loading: true })
      try {
        const response = await apiProtected.get('/tag')
        setState({ tags: response.data, loading: false })
      } catch (error) {
        notify('warning', 'Failed to fetch tags')
        setState({ ...state, loading: false })
      }
    }

    fetchTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TagsContext.Provider value={{ state }}>{children}</TagsContext.Provider>
  )
}

// proptypes
TagsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
