import { useContext, useEffect } from 'react'
import { useModal } from '../../contexts/global/modalContext'
import { UsersContext } from '../../contexts/modules/usersContext'
import { useUsers } from '../../hooks/other'

import { FaTrashAlt } from 'react-icons/fa'
import Svg from '../../assets/header/others.svg'
import { MasterLayout } from '../../layouts'
import {
  Banner,
  CustomPagination,
  DataTable,
  Header,
  NoData,
  TableImg,
} from '../../modules/shared'
import DeleteUser from './components/DeleteUser'

const UsersList = () => {
  // useContext
  const { state } = useContext(UsersContext)
  const {
    getUsers,
    setUserNameFilter,
    setEmailFilter,
    setCountryFilter,
    setGroupsFilter,
    setPagination,
  } = useUsers()

  // get users
  useEffect(() => {
    getUsers(
      state.pageNumber,
      state.pageSize,
      state.userName,
      state.email,
      state.country,
      state.groups
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.pageNumber,
    state.pageSize,
    state.userName,
    state.email,
    state.country,
    state.groups,
  ])

  // delete user modal
  const { openDeleteUserModal, setActionUser } = useModal()

  const tableColumns = [
    'Username',
    'Image',
    'Email',
    'Phone Number',
    'Country',
    'Group',
  ]

  return (
    <MasterLayout>
      {/* Header and Banner */}
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

      {/* Filtration */}
      <div className='filteration d-flex justify-content-between align-items-center gap-3 my-3'>
        {/* Username Filter */}
        <input
          type='text'
          className='form-control'
          placeholder='Search by Username'
          value={state.userName}
          onChange={(e) => setUserNameFilter(e.target.value)}
        />
        {/* Email Filter */}
        <input
          type='text'
          className='form-control'
          placeholder='Search by Email'
          value={state.email}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        {/* Country Filter */}
        <input
          type='text'
          className='form-control'
          placeholder='Search by Country'
          value={state.country}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
        {/* Groups Filter */}
        <select
          className='form-select'
          value={state.groups}
          onChange={(e) => setGroupsFilter(e.target.value)}
        >
          <option value=''>User Groups</option>
          <option value='1'>SuperAdmin</option>
          <option value='2'>SystemUser</option>
        </select>
      </div>

      {/* Users Table */}
      <div className='users-table'>
        <DataTable tableColumns={tableColumns}>
          {state.users &&
          Array.isArray(state.users) &&
          state.users.length > 0 ? (
            state.users.map((user, index) => (
              <tr key={user.id}>
                <th scope='row'>{index + 1}</th>
                <td>{user.userName}</td>
                <td>
                  <TableImg
                    path={user.imagePath}
                    altTxt={user.userName}
                    fit='contain'
                  />
                </td>
                <td className='text-truncate' style={{ maxWidth: '150px' }}>
                  {user.email}
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.country}</td>
                <td>{user && user.group ? user.group.name : ''}</td>
                <td>
                  <p
                    className='dropdown-item cursor-pointer text-danger d-flex gap-3 align-items-center m-0'
                    id='delete-user'
                    onClick={() => {
                      setActionUser(user)
                      openDeleteUserModal()
                    }}
                  >
                    <FaTrashAlt className='pe-none' />
                    <span className='text-dark pe-none'>Delete</span>
                  </p>
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
        </DataTable>
      </div>

      {/* Pagination */}
      {!state.loading && state.totalNumberOfRecords >= 10 && (
        <CustomPagination
          pageNumber={state.pageNumber}
          pageSize={state.pageSize}
          setPagination={setPagination}
          totalNumberOfRecords={state.totalNumberOfRecords}
        />
      )}

      {/* Delete User Modal */}
      <DeleteUser />
    </MasterLayout>
  )
}

export default UsersList
