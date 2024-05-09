// Initial state
const initialState = {
  favorites: [],
  loading: false,
}

// Reducer function
function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    // CRUD operations
    case 'GET_FAVORITES_SUCCESS':
      return { ...state, favorites: action.payload, loading: false }

    case 'ADD_TO_FAVORITES_SUCCESS':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        loading: false,
      }

    case 'REMOVE_FROM_FAVORITES_SUCCESS':
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
        loading: false,
      }

    default:
      return state
  }
}

export default favoritesReducer
