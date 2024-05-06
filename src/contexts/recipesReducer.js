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
    case 'GET_RECIPES':
      return { ...state, loading: true }
    case 'GET_RECIPES_SUCCESS':
      return {
        ...state,
        recipes: action.payload.data,
        totalNumberOfRecords: action.payload.totalNumberOfRecords,
        totalNumberOfPages: action.payload.totalNumberOfPages,
        loading: false,
      }
    case 'GET_RECIPES_FAILURE':
      return { ...state, loading: false }
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
    case 'ADD_RECIPE':
      return { ...state, loading: true }
    case 'ADD_RECIPE_SUCCESS':
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
        loading: false,
      }
    case 'ADD_RECIPE_FAILURE':
      return { ...state, loading: false }
    case 'UPDATE_RECIPE':
      return { ...state, loading: true }
    case 'UPDATE_RECIPE_SUCCESS':
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
        loading: false,
      }
    case 'UPDATE_RECIPE_FAILURE':
      return { ...state, loading: false }
    case 'DELETE_RECIPE':
      return { ...state, loading: true }
    case 'DELETE_RECIPE_SUCCESS':
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
        loading: false,
      }
    case 'DELETE_RECIPE_FAILURE':
      return { ...state, loading: false }
    case 'GET_RECIPE_BY_ID':
      return { ...state, loading: true }
    case 'GET_RECIPE_BY_ID_SUCCESS':
      return { ...state, selectedRecipe: action.payload, loading: false }
    case 'GET_RECIPE_BY_ID_FAILURE':
      return { ...state, loading: false }
    default:
      return state
  }
}

export default recipesReducer
