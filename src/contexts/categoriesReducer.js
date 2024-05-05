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
      return { ...state, loading: true } // Set loading to true before fetching categories
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload.data,
        totalNumberOfRecords: action.payload.totalNumberOfRecords,
        totalNumberOfPages: action.payload.totalNumberOfPages,
        loading: false,
      } // Set loading to false after successful fetch
    case 'GET_CATEGORIES_FAILURE':
      return { ...state, loading: false } // Set loading to false if fetching fails
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    case 'SET_PAGINATION':
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      }
    case 'ADD_CATEGORY':
      return { ...state, loading: true } // Set loading to true before adding a category
    case 'ADD_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false, // Set loading to false after successful addition
      }
    case 'ADD_CATEGORY_FAILURE':
      return { ...state, loading: false } // Set loading to false if adding category fails
    case 'UPDATE_CATEGORY':
      return { ...state, loading: true } // Set loading to true before updating a category
    case 'UPDATE_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        loading: false, // Set loading to false after successful update
      }
    case 'UPDATE_CATEGORY_FAILURE':
      return { ...state, loading: false } // Set loading to false if updating category fails
    case 'DELETE_CATEGORY':
      return { ...state, loading: true } // Set loading to true before deleting a category
    case 'DELETE_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        loading: false, // Set loading to false after successful deletion
      }
    case 'DELETE_CATEGORY_FAILURE':
      return { ...state, loading: false } // Set loading to false if deleting category fails
    default:
      return state
  }
}

export default categoriesReducer
