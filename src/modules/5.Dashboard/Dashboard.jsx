import { useContext } from 'react'
import { AuthContext } from '../../contexts/global/authContext'

import { MasterLayout } from '../../layouts'
import { Header, Banner } from '../../modules/shared'
import HomeSvg from '../../assets/header/home.svg'

const Dashboard = () => {
  const { user, userType } = useContext(AuthContext)
  return (
    <MasterLayout>
      <div className='d-flex flex-column gap-3'>
        <Header
          title={`Welcome ${user?.userName}!`}
          description='
          This is a welcoming screen for the entry of the application , you can now see the options
        '
          imgUrl={HomeSvg}
        />
        <Banner
          buttonTitle={userType === 'SuperAdmin' ? 'Fill Recipes' : 'Recipes'}
          buttonDestination='/recipes'
        >
          <h4>
            {userType === 'SuperAdmin' ? 'Fill' : 'Show '} the{' '}
            <span className='text-success'>Recipes!</span>
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
