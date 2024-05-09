import { useEffect, useContext } from 'react'
import { useRecipes } from '../../hooks/other'
import { RecipesContext } from '../../contexts/modules/recipesContext'
import { AuthContext } from '../../contexts/global/authContext'
import { useModal } from '../../contexts/global/modalContext'
import { FavoritesContext } from '../../contexts/modules/favoritesContext'
import { useFavorites } from '../../hooks/other'
import { staticURL } from '../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'

import { MasterLayout } from '../../layouts'
import { DeleteRecipeItem } from './'
import { Button, Spinner, Card, Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt, FaRegHeart, FaHeart } from 'react-icons/fa'
import nodataImg from '../../assets/images/no-data.png'

const RecipeItem = () => {
  const { userType } = useContext(AuthContext)
  const navigate = useNavigate()
  // getting the id from the url
  const { id } = useParams()
  const { state } = useContext(RecipesContext)
  const { getRecipeById } = useRecipes()

  // getting the recipe by id
  useEffect(() => {
    getRecipeById(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
    // console.log(id)
    // getting the favorite item that has recipe with this id from favorites state
    const favoriteItem = favoritesState.favorites.find(
      (favorite) => favorite.recipe.id === id
    )
    // console.log(favoriteItem)
    // removing the favorite item from favorites
    removeFromFavorites(favoriteItem.id)
  }

  if (state.loading) {
    return (
      <MasterLayout>
        <div className='d-flex flex-column h-100 justify-content-center align-items-center'>
          <Spinner
            as='span'
            animation='grow'
            size='2xl'
            role='status'
            aria-hidden='true'
            variant='success'
          />
          <h3 className='mt-3 text-success'>Loading Recipe ...</h3>
        </div>
      </MasterLayout>
    )
  }

  return (
    <MasterLayout>
      <div>
        <div className='button p-3'>
          <Button
            variant='dark'
            className='btn btn-success px-4 d-flex align-items-center gap-3'
            onClick={() => navigate('/recipes')}
          >
            <i className='fas fa-arrow-left d-inline-block'></i>
            Back To Recipes
          </Button>
        </div>

        <div className='container mt-5'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <div className='content'>
              <h3 className='text-dark'>
                Recipe #{state.selectedRecipe?.id} Details
              </h3>
            </div>
            {userType === 'SuperAdmin' ? (
              <>
                <div className='d-flex justify-content-end  gap-3'>
                  <Button
                    variant='success'
                    className=' px-4 d-flex align-items-center gap-3'
                    id='add-category'
                    onClick={() => navigate(`/editRecipe/${id}`)}
                  >
                    <FaEdit />
                    Edit
                  </Button>
                  <Button
                    variant='danger'
                    className=' px-4 d-flex align-items-center gap-3'
                    id='add-category'
                    onClick={() => {
                      setActionRecipe(state.selectedRecipe)
                      openDeleteModal()
                    }}
                  >
                    <FaTrashAlt />
                    Delete
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  {isFavorite(state.selectedRecipe.id) ? (
                    <Button
                      variant='danger'
                      className=' px-4 d-flex align-items-center gap-3'
                      onClick={() =>
                        removeItemFromFavorites(state.selectedRecipe.id)
                      }
                    >
                      <FaHeart />
                      Unsave
                    </Button>
                  ) : (
                    <Button
                      variant='success'
                      className=' px-4 d-flex align-items-center gap-3'
                      onClick={() => addToFavorites(state.selectedRecipe.id)}
                    >
                      <FaRegHeart />
                      Save
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          {state.selectedRecipe && (
            <Card>
              <Card.Img
                variant='top'
                src={
                  state.selectedRecipe.imagePath
                    ? `${staticURL}/${state.selectedRecipe.imagePath}`
                    : nodataImg
                }
              />
              <Card.Body>
                <Table striped hover borderless responsive>
                  <tbody>
                    <tr>
                      <td>Recipe Name</td>
                      <td>{state.selectedRecipe.name}</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      {Array.isArray(state.selectedRecipe.category) &&
                      state.selectedRecipe.category?.length > 1 ? (
                        <td>{state.selectedRecipe.category[0]?.name}</td>
                      ) : (
                        <td>No Category</td>
                      )}
                    </tr>
                    <tr>
                      <td>Tag</td>
                      <td>{state.selectedRecipe.tag?.name}</td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>{state.selectedRecipe.price} EGP</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>{state.selectedRecipe.description}</td>
                    </tr>
                    <tr>
                      <td>Created at</td>
                      <td>
                        {new Date(
                          state.selectedRecipe.creationDate
                        ).toLocaleDateString('en-US')}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </div>

        <DeleteRecipeItem />
      </div>
    </MasterLayout>
  )
}

export default RecipeItem
