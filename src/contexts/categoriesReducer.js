// Initial state
const initialState = {
  categories: [],
  loading: false,
  pageNumber: 1,
  pageSize: 10,
  filter: '',
  totalNumberOfRecords: 0,
  totalNumberOfPages: 0,
}

// Reducer function
function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return { ...state, loading: true }
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload.data,
        totalNumberOfRecords: action.payload.totalNumberOfRecords,
        totalNumberOfPages: action.payload.totalNumberOfPages,
        loading: false,
      }
    case 'GET_CATEGORIES_FAILURE':
      return { ...state, loading: false }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    case 'SET_PAGINATION':
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      }
    case 'ADD_CATEGORY':
      return { ...state, loading: true }
    case 'ADD_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        loading: false, 
      }
    case 'ADD_CATEGORY_FAILURE':
      return { ...state, loading: false }
    case 'UPDATE_CATEGORY':
      return { ...state, loading: true }
    case 'UPDATE_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        loading: false, 
      }
    case 'UPDATE_CATEGORY_FAILURE':
      return { ...state, loading: false }
    case 'DELETE_CATEGORY':
      return { ...state, loading: true }
    case 'DELETE_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        loading: false, 
      }
    case 'DELETE_CATEGORY_FAILURE':
      return { ...state, loading: false }
    default:
      return state
  }
}

export default categoriesReducer
