import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './contexts/global/authContext.jsx'
import ModalProvider from './contexts/global/modalContext.jsx'
import { CategoriesProvider } from './contexts/modules/categoriesContext.jsx'
import { RecipesProvider } from './contexts/modules/recipesContext.jsx'
import { TagsProvider } from './contexts/global/tagsContext.jsx'
import { UsersProvider } from './contexts/modules/usersContext.jsx'
import { FavoritesProvider } from './contexts/modules/favoritesContext.jsx'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
// custom css
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <CategoriesProvider>
          <RecipesProvider>
            <TagsProvider>
              <UsersProvider>
                <FavoritesProvider>
                  <App />
                </FavoritesProvider>
              </UsersProvider>
            </TagsProvider>
          </RecipesProvider>
        </CategoriesProvider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
)
