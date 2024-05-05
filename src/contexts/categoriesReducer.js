// Initial state
const initialState = {
  categories: [],
  loading: false,
}

// Action types
const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'

// Reducer function
function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload, loading: false }
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        loading: false,
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        loading: false,
      }
    default:
      return state
  }
}

export default categoriesReducer
