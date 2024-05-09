

import RecipesForm from './components/RecipesForm'
import { MasterLayout } from '../../layouts'
import { Banner } from '../../modules/shared'

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
      <RecipesForm />
    </MasterLayout>
  )
}

export default AddRecipeItem
