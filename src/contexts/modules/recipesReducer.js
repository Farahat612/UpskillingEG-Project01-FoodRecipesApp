// Initial state
const initialState = {
  recipes: [],
  selectedRecipe: {},
  loading: false,
  pageNumber: 1,
  pageSize: 10,
  filter: '',
  totalNumberOfRecords: 0,
  totalNumberOfPages: 0,
  selectedCategoryId: null,
  selectedTagId: null,
}

// Reducer function
function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    // CRUD operations
    case 'GET_RECIPES_SUCCESS':
      return {
        ...state,
        recipes: action.payload.data,
        totalNumberOfRecords: action.payload.totalNumberOfRecords,
        totalNumberOfPages: action.payload.totalNumberOfPages,
        loading: false,
      }

    case 'ADD_RECIPE_SUCCESS':
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
        loading: false,
      }

    case 'UPDATE_RECIPE_SUCCESS':
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
        loading: false,
      }

    case 'DELETE_RECIPE_SUCCESS':
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
        loading: false,
      }

    case 'GET_RECIPE_BY_ID_SUCCESS':
      return { ...state, selectedRecipe: action.payload, loading: false }

    // Filter and Pagination operations
    case 'SET_FILTER':
      return { ...state, filter: action.payload }

    case 'SET_PAGINATION':
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      }

    case 'SET_CATEGORY_FILTER':
      return { ...state, selectedCategoryId: action.payload }

    case 'SET_TAG_FILTER':
      return { ...state, selectedTagId: action.payload }

    default:
      return state
  }
}

export default recipesReducer
