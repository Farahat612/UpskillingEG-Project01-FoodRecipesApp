import { MasterLayout } from '../../layouts'
import { Header, Banner } from '../../components/shared'
import HomeSvg from '../../assets/header/home.svg'

const Dashboard = () => {
  return (
    <MasterLayout>
      <div className='d-flex flex-column gap-3'>
        <Header
          title='Welcome Upskilling!'
          description='
          This is a welcoming screen for the entry of the application , you can now see the options
        '
          imgUrl={HomeSvg}
        />
        <Banner buttonTitle='Fill Recipes' buttonDestination='/recipes'>
          <h4>
            Fill the <span className='text-success'>Recipes!</span>
          </h4>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </Banner>
      </div>
    </MasterLayout>
  )
}

export default Dashboard
