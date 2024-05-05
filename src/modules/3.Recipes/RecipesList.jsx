import { MasterLayout } from '../../layouts'
import { Header, Banner } from '../../components/shared'
import Svg from '../../assets/header/others.svg'

const RecipesList = () => {
  return (
    <MasterLayout>
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
    </MasterLayout>
  )
}

export default RecipesList
