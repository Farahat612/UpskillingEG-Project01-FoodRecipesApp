// react hooks
import { useContext } from 'react'
// react-router-dom
import { RouterProvider, createHashRouter } from 'react-router-dom'
// contexts
import { AuthContext } from './contexts/global/authContext'
// react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// components
import { LoadingScreen, NotFound, RouteGuard } from './modules/shared'
// Auth
import {
  ForgotPass,
  Login,
  Register,
  ResetPass,
  VerifyPass,
} from './modules/1.Authentication'
// Dashboard
import { CategoriesList } from './modules/2.Categories'
import {
  AddRecipeItem,
  EditRecipeItem,
  RecipeItem,
  RecipesList,
} from './modules/3.Recipes'
import { UsersList } from './modules/4.Users'
import { Dashboard } from './modules/5.Dashboard'
import { UserFavourites } from './modules/6.UserPortal'

// styles
import './App.css'

function App() {
  const { isLoading } = useContext(AuthContext)

  if (isLoading) {
    return (
      <>
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center gap-4 flex-column'>
          <LoadingScreen />
        </div>
      </>
    )
  }
  const router = createHashRouter([
    {
      path: '/',
      element: <RouteGuard />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'categories', element: <CategoriesList /> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'addRecipe', element: <AddRecipeItem /> },
        { path: 'editRecipe/:id', element: <EditRecipeItem /> },
        { path: 'recipeItem/:id', element: <RecipeItem /> },
        { path: 'users', element: <UsersList /> },
        { path: 'userFavourites', element: <UserFavourites /> },
      ],
    },
    {
      path: 'auth',
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'verifyPass', element: <VerifyPass /> },
        { path: 'forgotPass', element: <ForgotPass /> },
        { path: 'resetPass', element: <ResetPass /> },
      ],
    },
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
