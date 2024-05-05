import { MasterLayout } from '../../layouts'
import { Header, Banner } from '../../components/shared'
import Svg from '../../assets/header/others.svg'

const UsersList = () => {
  return (
    <MasterLayout>
      <div className='d-flex flex-column gap-3'>
        <Header
          title='Users List'
          description='You can now add your items that any user can order it from the Application and you can edit'
          imgUrl={Svg}
        />

        <Banner>
          <h4>User Table Details</h4>
          <p>you can check all users details here!</p>
        </Banner>
      </div>
    </MasterLayout>
  )
}

export default UsersList
