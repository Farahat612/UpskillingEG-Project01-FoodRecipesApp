// Initial state
const initialState = {
  users: [],
  currentUser: {},
  loading: false,
  pageNumber: 1,
  pageSize: 10,
  userNameFilter: '',
  emailFilter: '',
  countryFilter: '',
  groupsFilter: [],
  totalNumberOfRecords: 0,
  totalNumberOfPages: 0,
}

// Reducer function
function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, loading: true }
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload.data,
        totalNumberOfRecords: action.payload.totalNumberOfRecords,
        totalNumberOfPages: action.payload.totalNumberOfPages,
        loading: false,
      }
    case 'GET_USERS_FAILURE':
      return { ...state, loading: false }
    case 'SET_USERNAME_FILTER':
      return { ...state, userName: action.payload }
    case 'SET_EMAIL_FILTER':
      return { ...state, email: action.payload }
    case 'SET_COUNTRY_FILTER':
      return { ...state, country: action.payload }
    case 'SET_GROUPS_FILTER':
      return { ...state, groups: action.payload }
    case 'SET_PAGINATION':
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      }

    case 'DELETE_USER':
      return { ...state, loading: true }
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        loading: false,
      }
    case 'DELETE_USER_FAILURE':
      return { ...state, loading: false }
    default:
      return state
  }
}

export default usersReducer

/*
  add and update actions for later
  case 'ADD_USER':
      return { ...state, loading: true }
    case 'ADD_USER_SUCCESS':
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
      }
    case 'ADD_USER_FAILURE':
      return { ...state, loading: false }
    case 'UPDATE_USER':
      return { ...state, loading: true }
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false,
      }
    case 'UPDATE_USER_FAILURE':
      return { ...state, loading: false }
*/
