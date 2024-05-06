// react hooks
import { useEffect } from 'react'
// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// contexts
import { useAuth } from './contexts/authContext'
// react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// components
import { NotFound } from './components/shared'
// Auth
import {
  Login,
  Register,
  ForgotPass,
  ResetPass,
  VerifyPass,
} from './modules/1.Authentication'
// Dashboard
import { CategoriesList } from './modules/2.Categories'
import {
  RecipesList,
  RecipeItem,
  AddRecipeItem,
  EditRecipeItem,
} from './modules/3.Recipes'
import { UsersList } from './modules/4.Users'
import { Dashboard } from './modules/5.Dashboard'

// styles
import './App.css'

function App() {
  const { saveUser } = useAuth()

  useEffect(() => {
    saveUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* <Route path='/' element={<RouteGuard />}> */}
            <Route index element={<Dashboard />} />
            <Route index path='dashboard' element={<Dashboard />} />
            <Route path='categories' element={<CategoriesList />} />
            <Route path='recipes' element={<RecipesList />} />
            <Route path='addRecipe' element={<AddRecipeItem />} />
            <Route path='editRecipe/:id' element={<EditRecipeItem />} />
            <Route path='recipeItem/:id' element={<RecipeItem />} />
            <Route path='users' element={<UsersList />} />
          {/* </Route> */}

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='verifyPass' element={<VerifyPass />} />
          <Route path='forgotPass' element={<ForgotPass />} />
          <Route path='resetPass' element={<ResetPass />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
