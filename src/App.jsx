// react hooks
import { useEffect, useContext } from 'react'
// react-router-dom
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// contexts
import { AuthContext } from './contexts/global/authContext'
// react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// components
import { NotFound, RouteGuard, LoadingScreen } from './modules/shared'
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
  const { saveUser, isLoading } = useContext(AuthContext)

  useEffect(() => {
    saveUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <>
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center gap-4 flex-column'>
          <LoadingScreen />
        </div>
      </>
    )
  }
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<RouteGuard mode='private' />}>
            <Route index element={<Dashboard />} />
            <Route index path='dashboard' element={<Dashboard />} />
            <Route path='categories' element={<CategoriesList />} />
            <Route path='recipes' element={<RecipesList />} />
            <Route path='addRecipe' element={<AddRecipeItem />} />
            <Route path='editRecipe/:id' element={<EditRecipeItem />} />
            <Route path='recipeItem/:id' element={<RecipeItem />} />
            <Route path='users' element={<UsersList />} />
            <Route path='userFavourites' element={<UserFavourites />} />
          </Route>

          <Route path='/' element={<RouteGuard mode='public' />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='verifyPass' element={<VerifyPass />} />
            <Route path='forgotPass' element={<ForgotPass />} />
            <Route path='resetPass' element={<ResetPass />} />
          </Route>

          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
