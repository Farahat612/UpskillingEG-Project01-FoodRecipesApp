import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/global/authContext'
import { useModal } from '../../contexts/global/modalContext'
import { TagsContext } from '../../contexts/global/tagsContext'
import { CategoriesContext } from '../../contexts/modules/categoriesContext'
import { FavoritesContext } from '../../contexts/modules/favoritesContext'
import { RecipesContext } from '../../contexts/modules/recipesContext'
import { useCategories, useFavorites, useRecipes } from '../../hooks/other'

import { FaEdit, FaEye, FaHeart, FaRegHeart, FaTrashAlt } from 'react-icons/fa'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import Svg from '../../assets/header/others.svg'
import { MasterLayout } from '../../layouts'
import {
  Banner,
  CustomPagination,
  DataTable,
  Header,
  NoData,
  TableImg,
} from '../../modules/shared'
import { DeleteRecipeItem } from './'

const RecipesList = () => {
  const { userType } = useAuth()
  // navigate
  const navigate = useNavigate()
  // categories for filteration
  const { state: categoriesState } = useContext(CategoriesContext)
  let categoriesTotal =
    categoriesState.totalNumberOfRecords != 0
      ? categoriesState.totalNumberOfRecords
      : 15
  const { getCategories } = useCategories()
  // tags for filteration
  const { state: tagsState } = useContext(TagsContext)
  // recipes
  const { state } = useContext(RecipesContext)
  const {
    getRecipes,
    setFilter,
    setPagination,
    setCategoryFilter,
    setTagFilter,
  } = useRecipes()

  // get categories and recipes
  useEffect(() => {
    getCategories(categoriesState.pageNumber, categoriesTotal)
    getRecipes(
      state.pageNumber,
      state.pageSize,
      state.filter,
      state.selectedCategoryId,
      state.selectedTagId
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.pageNumber,
    state.pageSize,
    state.filter,
    state.selectedCategoryId,
    state.selectedTagId,
    // categoriesState.totalNumberOfRecords,
  ])

  // delete modal
  const { openDeleteModal, setActionRecipe } = useModal()

  // favorites
  const { state: favoritesState } = useContext(FavoritesContext)
  const { getFavorites, addToFavorites, removeFromFavorites } = useFavorites()
  useEffect(() => {
    userType === 'SystemUser' && getFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const isFavorite = (recipeId) => {
    const exist = favoritesState.favorites.find(
      (favorite) => favorite.recipe.id === recipeId
    )
    return exist ? true : false
  }
  const removeItemFromFavorites = (id) => {
    // console.log(id)
    // getting the favorite item that has recipe with this id from favorites state
    const favoriteItem = favoritesState.favorites.find(
      (favorite) => favorite.recipe.id === id
    )
    // console.log(favoriteItem)
    // removing the favorite item from favorites
    removeFromFavorites(favoriteItem.id)
  }

  const tableColumns = [
    'Recipe Name',
    'Image',
    'Price',
    'Description',
    'Category',
    'Tag',
  ]

  return (
    <MasterLayout>
      {/* Header and Banner */}
      {userType === 'SuperAdmin' && (
        <div className='d-flex flex-column gap-3'>
          <Header
            title='Recipes Items'
            description='You can now add your items that any user can order it from the Application and you can edit'
            imgUrl={Svg}
          />

          <Banner buttonTitle='Add Recipe' buttonDestination='/addRecipe'>
            <h4>Recipes Table Details</h4>
            <p>you can check all recipes details here!</p>
          </Banner>
        </div>
      )}

      {/* Filteration */}
      <div className='filteration d-flex justify-content-between align-items-center gap-3 my-3'>
        {/* 01 Filteration By name */}
        <input
          type='text'
          className='form-control'
          placeholder='Search by name'
          value={state.filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* 02 Filteration By Category */}
        <select
          className='form-select'
          value={state.selectedCategoryId ? state.selectedCategoryId : ''}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value=''>All Categories</option>
          {categoriesState.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* 03 Filteration By Tag */}
        <select
          className='form-select'
          value={state.selectedTagId ? state.selectedTagId : ''}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value=''>All Tags</option>
          {tagsState.tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      {/* Recipes Table */}
      <div className='recipes-table'>
        <DataTable tableColumns={tableColumns}>
          {state.recipes &&
          Array.isArray(state.recipes) &&
          state.recipes.length > 0 ? (
            state.recipes.map((recipe, index) => (
              <tr key={recipe.id}>
                <th scope='row'>{index + 1}</th>
                <td>{recipe.name}</td>
                <td>
                  <TableImg
                    path={recipe.imagePath}
                    altTxt={recipe.name}
                    fit='cover'
                  />
                </td>
                <td>{recipe.price}</td>
                <td className='text-truncate' style={{ maxWidth: '150px' }}>
                  {recipe.description}
                </td>
                <td>
                  {recipe && recipe.category ? recipe.category[0]?.name : ''}
                </td>
                <td>{recipe.tag?.name}</td>
                <td>
                  <div className='dropdown d-flex justify-content-center'>
                    <span
                      className='cursor-pointer'
                      id='dropdownMenuButton'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <IoEllipsisHorizontal />
                    </span>

                    <ul
                      className='dropdown-menu p-2'
                      aria-labelledby='dropdownMenuButton'
                    >
                      <li>
                        <p
                          className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center my-1'
                          id='view-recipe'
                          onClick={() => navigate(`/recipeItem/${recipe.id}`)}
                        >
                          <FaEye className='pe-none' />
                          <span className='text-dark pe-none'>View</span>
                        </p>
                      </li>
                      {userType === 'SuperAdmin' ? (
                        <>
                          <li>
                            <p
                              className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center my-1'
                              id='edit-recipe'
                              onClick={() =>
                                navigate(`/editRecipe/${recipe.id}`)
                              }
                            >
                              <FaEdit className='pe-none' />
                              <span className='text-dark pe-none'>Edit</span>
                            </p>
                          </li>
                          <li>
                            <p
                              className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center m-0'
                              id='delete-recipe'
                              onClick={() => {
                                setActionRecipe(recipe)
                                openDeleteModal()
                              }}
                            >
                              <FaTrashAlt className='pe-none' />
                              <span className='text-dark pe-none'>Delete</span>
                            </p>
                          </li>
                        </>
                      ) : (
                        <li>
                          <p
                            className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center m-0'
                            id='delete-recipe'
                            onClick={() => {
                              isFavorite(recipe.id)
                                ? removeItemFromFavorites(recipe.id)
                                : addToFavorites(recipe.id)
                            }}
                          >
                            {isFavorite(recipe.id) ? (
                              <>
                                <FaHeart className='pe-none' />
                                <span className='text-dark pe-none'>
                                  Remove from Favourites
                                </span>
                              </>
                            ) : (
                              <>
                                <FaRegHeart className='pe-none' />
                                <span className='text-dark pe-none'>
                                  Add to Favourites
                                </span>
                              </>
                            )}
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td colSpan='8'>
                  <NoData />
                </td>
              </tr>
            </>
          )}
        </DataTable>
      </div>
      {/* Pagination */}
      {!state.loading && state.totalNumberOfRecords > 10 && (
        <CustomPagination
          pageNumber={state.pageNumber}
          pageSize={state.pageSize}
          setPagination={setPagination}
          totalNumberOfRecords={state.totalNumberOfRecords}
        />
      )}

      {/* Delete Modal */}
      <DeleteRecipeItem />
    </MasterLayout>
  )
}

export default RecipesList
