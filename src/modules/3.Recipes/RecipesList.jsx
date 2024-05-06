/* eslint-disable no-unused-vars */
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipesContext } from '../../contexts/recipesContext'
import { useRecipes } from '../../hooks/recipes'
import { staticURL } from '../../utils/api'

import { MasterLayout } from '../../layouts'
import { Header, Banner, LoadingScreen, NoData } from '../../components/shared'
import Svg from '../../assets/header/others.svg'
import nodataImg from '../../assets/images/no-data.png'
import { Table, Pagination } from 'react-bootstrap'
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa'
import { IoEllipsisHorizontal } from 'react-icons/io5'

const RecipesList = () => {
  const navigate = useNavigate()
  const { state } = useContext(RecipesContext)
  const {
    getRecipes,
    setFilter,
    setPagination,
    setCategoryFilter,
    setTagFilter,
  } = useRecipes()

  useEffect(() => {
    getRecipes(state.pageNumber, state.pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageNumber, state.pageSize])

  return (
    <MasterLayout>
      {/* Header and Banner */}
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

      {/* Filteration goes here */}

      {/* Categories Table */}
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
                        className='img-fluid'
                      />
                    </td>
                    <td>{recipe.price}</td>
                    <td className='text-truncate' style={{ maxWidth: '150px' }}>
                      {recipe.description}
                    </td>
                    <td>{recipe.category[0]?.name}</td>
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
                              className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center'
                              id='view-recipe'
                              onClick={() =>
                                navigate(`/recipeItem/${recipe.id}`)
                              }
                            >
                              <FaEye className='pe-none' />
                              <span className='text-dark pe-none'>View</span>
                            </p>
                            <p
                              className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center'
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
                              // onClick={() =>
                              //   handleDeleteClick(recipe.id, recipe.name)
                              // }
                            >
                              <FaTrashAlt className='pe-none' />
                              <span className='text-dark pe-none'>Delete</span>
                            </p>
                          </li>
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
    </MasterLayout>
  )
}

export default RecipesList
