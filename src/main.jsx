import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './contexts/authContext.jsx'
import ModalProvider from './contexts/modalContext.jsx'
import { CategoriesProvider } from './contexts/categoriesContext.jsx'
import { RecipesProvider } from './contexts/recipesContext.jsx'
import { TagsProvider } from './contexts/tagsContext.jsx'
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
              <App />
            </TagsProvider>
          </RecipesProvider>
        </CategoriesProvider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
)
