import { useEffect, useContext } from 'react'
import { useRecipes } from '../../hooks/other'
import { RecipesContext } from '../../contexts/recipesContext'
import { useParams } from 'react-router-dom'

import RecipesForm from './components/RecipesForm'
import { MasterLayout } from '../../layouts'
import { Banner } from '../../modules/shared'
import {  Spinner,   } from 'react-bootstrap'

const EditRecipeItem = () => {
  // getting the id from the url
  const { id } = useParams()
  const { state } = useContext(RecipesContext)
  const { getRecipeById } = useRecipes()

  // getting the recipe by id
  useEffect(() => {
    getRecipeById(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
      <Banner buttonTitle='All Recipes' buttonDestination='/recipes'>
        <h4>
          Fill the <span className='text-success'>Recipes!</span>
        </h4>
        <p>
          you can now fill the meals easily using the table and form , click
          here and sill it with the table !
        </p>
      </Banner>
      <RecipesForm recipe={state.selectedRecipe} />
    </MasterLayout>
  )
}

export default EditRecipeItem
