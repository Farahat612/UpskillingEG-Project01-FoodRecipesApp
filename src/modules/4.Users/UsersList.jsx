import { useContext, useEffect } from 'react'
import { UsersContext } from '../../contexts/usersContext'
import { useUsers } from '../../hooks/users'
import { useModal } from '../../contexts/modalContext'
import { staticURL } from '../../utils/api'

import { MasterLayout } from '../../layouts'
import { Header, Banner, LoadingScreen, NoData } from '../../components/shared'
import Svg from '../../assets/header/others.svg'
import nodataImg from '../../assets/images/no-data.png'
import { Table, Pagination } from 'react-bootstrap'
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa'
import { IoEllipsisHorizontal } from 'react-icons/io5'


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
      state.userNameFilter,
      state.emailFilter,
      state.countryFilter,
      state.groupsFilter
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.pageNumber,
    state.pageSize,
    state.userNameFilter,
    state.emailFilter,
    state.countryFilter,
    state.groupsFilter,
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
                          objectFit: 'cover',
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
                        // onClick={() => {
                        //   setActionuser(user)
                        //   openDeleteModal()
                        // }}
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
    </MasterLayout>
  )
}

export default UsersList
