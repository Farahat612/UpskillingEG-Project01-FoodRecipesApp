import { MasterLayout } from '../../layouts'
import { Header, Banner } from '../../components/shared'
import Svg from '../../assets/header/others.svg'

const CategoriesList = () => {
  return (
    <MasterLayout>
      <div className='d-flex flex-column gap-3'>
        <Header
          title='Categories List'
          description='You can now add your items that any user can order it from the Application and you can edit'
          imgUrl={Svg}
        />

        <Banner buttonTitle='Add Category' btnId={'add-category'}>
          <h4>Categories Table Details</h4>
          <p>you can check all categories details here!</p>
        </Banner>
      </div>
    </MasterLayout>
  )
}

export default CategoriesList
