// import { useRecipes } from '../../hooks/recipes'
// import { RecipesContext } from '../../contexts/recipesContext'

import RecipesForm from './components/RecipesForm'
import { MasterLayout } from '../../layouts'
import { Banner } from '../../components/shared'

const AddRecipeItem = () => {
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
      <RecipesForm type='add' />
    </MasterLayout>
  )
}

export default AddRecipeItem
