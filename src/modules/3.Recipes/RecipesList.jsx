/* eslint-disable no-unused-vars */
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipesContext } from '../../contexts/recipesContext'
import { CategoriesContext } from '../../contexts/categoriesContext'
import { TagsContext } from '../../contexts/tagsContext'
import { FavoritesContext } from '../../contexts/favoritesContext'
import { useAuth } from '../../contexts/authContext'
import { useModal } from '../../contexts/modalContext'
import { useRecipes } from '../../hooks/recipes'
import { useCategories } from '../../hooks/categories'
import { useFavorites } from '../../hooks/favorites'
import { staticURL } from '../../utils/api'

import { MasterLayout } from '../../layouts'
import { Header, Banner, LoadingScreen, NoData } from '../../components/shared'
import { DeleteRecipeItem } from './'
import Svg from '../../assets/header/others.svg'
import nodataImg from '../../assets/images/no-data.png'
import { Table, Pagination } from 'react-bootstrap'
import { FaEdit, FaTrashAlt, FaEye, FaRegHeart, FaHeart } from 'react-icons/fa'
import { IoEllipsisHorizontal } from 'react-icons/io5'

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

  // pagination
  const handleNextPage = () => {
    setPagination(state.pageNumber + 1, state.pageSize)
  }
  const handlePreviousPage = () => {
    setPagination(state.pageNumber - 1, state.pageSize)
  }
  let totalPages = Math.ceil(state.totalNumberOfRecords / state.pageSize)
  let currentPage = state.pageNumber

  // delete modal
  const { openDeleteModal, setActionRecipe } = useModal()

  // favorites
  const { state: favoritesState } = useContext(FavoritesContext)
  const { getFavorites, addToFavorites, removeFromFavorites } = useFavorites()
  useEffect(() => {
    userType !== 'SuperAdmin' && getFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const isFavorite = (recipeId) => {
    const exist = favoritesState.favorites.find(
      (favorite) => favorite.recipe.id === recipeId
    )
    return exist ? true : false
  }
  const removeItemFromFavorites = (id) => {
    console.log(id)
    // getting the favorite item that has recipe with this id from favorites state
    const favoriteItem = favoritesState.favorites.find(
      (favorite) => favorite.recipe.id === id
    )
    console.log(favoriteItem)
    // removing the favorite item from favorites
    removeFromFavorites(favoriteItem.id)
  }

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
        {state.loading ? (
          <div className='w-100 h-100 my-5 py-5 d-flex flex-column justify-content-center align-items-center gap-3'>
            <LoadingScreen />
          </div>
        ) : (
          <Table striped hover borderless responsive>
            <thead className='rounded rounded-5'>
              <tr className='table-secondary h-md rounded rounded-5'>
                <th className='align-middle'>#</th>
                <th className='align-middle'>Recipe Name</th>
                <th className='w-10 align-middle'>Image</th>
                <th className='align-middle'>Price</th>
                <th className='align-middle'>Description</th>
                <th className='align-middle'>Category</th>
                <th className='align-middle'>Tag</th>
                <th className='w-10 text-center align-middle'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.recipes &&
              Array.isArray(state.recipes) &&
              state.recipes.length > 0 ? (
                state.recipes.map((recipe, index) => (
                  <tr key={recipe.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{recipe.name}</td>
                    <td>
                      <img
                        src={
                          recipe.imagePath
                            ? `${staticURL}/${recipe.imagePath}`
                            : nodataImg
                        }
                        alt={recipe.imagePath ? recipe.name : 'No Image'}
                        className='img-fluid '
                        style={{
                          width: '70px',
                          height: '40px',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                    <td>{recipe.price}</td>
                    <td className='text-truncate' style={{ maxWidth: '150px' }}>
                      {recipe.description}
                    </td>
                    <td>
                      {recipe && recipe.category
                        ? recipe.category[0]?.name
                        : ''}
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
                              onClick={() =>
                                navigate(`/recipeItem/${recipe.id}`)
                              }
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
                                  <span className='text-dark pe-none'>
                                    Edit
                                  </span>
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
                                  <span className='text-dark pe-none'>
                                    Delete
                                  </span>
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
            </tbody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {!state.loading && state.totalNumberOfRecords >= 10 && (
        <Pagination className='d-flex justify-content-start '>
          <Pagination.First
            onClick={() => setPagination(1, state.pageSize)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
          {totalPages > 0 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setPagination(page, state.pageSize)}
              >
                {page}
              </Pagination.Item>
            ))}
          <Pagination.Next
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setPagination(totalPages, state.pageSize)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      {/* Delete Modal */}
      <DeleteRecipeItem />
    </MasterLayout>
  )
}

export default RecipesList
