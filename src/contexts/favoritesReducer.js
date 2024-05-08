// Initial state
const initialState = {
  favorites: [],
  loading: false,
}

// Reducer function
function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_FAVORITES':
      return { ...state, loading: true }
    case 'GET_FAVORITES_SUCCESS':
      return { ...state, favorites: action.payload, loading: false }
    case 'GET_FAVORITES_FAILURE':
      return { ...state, loading: false }
    case 'ADD_TO_FAVORITES':
      return { ...state, loading: true }
    case 'ADD_TO_FAVORITES_SUCCESS':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        loading: false,
      }
    case 'ADD_TO_FAVORITES_FAILURE':
      return { ...state, loading: false }
    case 'REMOVE_FROM_FAVORITES':
      return { ...state, loading: true }
    case 'REMOVE_FROM_FAVORITES_SUCCESS':
      return {
        ...state,
        favorites: state.favorites.filter(
          (recipe) => recipe.id !== action.payload
        ),
        loading: false,
      }
    case 'REMOVE_FROM_FAVORITES_FAILURE':
      return { ...state, loading: false }
    default:
      return state
  }
}

export default favoritesReducer
