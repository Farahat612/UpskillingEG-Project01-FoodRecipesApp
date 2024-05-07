import { useContext, useEffect } from 'react'
import { UsersContext } from '../../contexts/usersContext'
import { useModal } from '../../contexts/modalContext'
import { useUsers } from '../../hooks/users'
import { staticURL } from '../../utils/api'

import { Pagination, Table } from 'react-bootstrap'
import { FaTrashAlt } from 'react-icons/fa'
import Svg from '../../assets/header/others.svg'
import nodataImg from '../../assets/images/no-data.png'
import { Banner, Header, LoadingScreen, NoData } from '../../components/shared'
import { MasterLayout } from '../../layouts'
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

  // pagination
  // pagination
  const handleNextPage = () => {
    setPagination(state.pageNumber + 1, state.pageSize)
  }
  const handlePreviousPage = () => {
    setPagination(state.pageNumber - 1, state.pageSize)
  }
  let totalPages = Math.ceil(state.totalNumberOfRecords / state.pageSize)
  let currentPage = state.pageNumber

  // delete user modal
  const { openDeleteUserModal, setActionUser } = useModal()

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
        {state.loading ? (
          <div className='w-100 h-100 my-5 py-5 d-flex flex-column justify-content-center align-items-center gap-3'>
            <LoadingScreen />
          </div>
        ) : (
          <Table striped hover borderless responsive>
            <thead className='rounded rounded-5'>
              <tr className='table-secondary h-md rounded rounded-5'>
                <th className='align-middle'>#</th>
                <th className='align-middle'>Username</th>
                <th className='align-middle'>Image</th>
                <th className='align-middle'>Email</th>
                <th className='align-middle'>Phone Number</th>
                <th className='align-middle'>Country</th>
                <th className='align-middle'>Group</th>
                <th className='w-10 text-center align-middle'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.users &&
              Array.isArray(state.users) &&
              state.users.length > 0 ? (
                state.users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{user.userName}</td>
                    <td>
                      <img
                        src={
                          user.imagePath
                            ? `${staticURL}/${user.imagePath}`
                            : nodataImg
                        }
                        alt={user.imagePath ? user.userName : 'No Image'}
                        className='img-fluid '
                        style={{
                          width: '70px',
                          height: '40px',
                          objectFit: 'contain',
                        }}
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
            </tbody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {!state.loading && state.totalNumberOfRecords >= 10 && (
        <Pagination className='d-flex justify-content-start '>
          <Pagination.First
            onClick={() => setPagination(1, state.pageSize)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
          {totalPages > 0 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setPagination(page, state.pageSize)}
              >
                {page}
              </Pagination.Item>
            ))}
          <Pagination.Next
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setPagination(totalPages, state.pageSize)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      {/* Delete User Modal */}
      <DeleteUser />
    </MasterLayout>
  )
}

export default UsersList
