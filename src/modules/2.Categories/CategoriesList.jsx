/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { CategoriesContext } from '../../contexts/categoriesContext'
import { useModal } from '../../contexts/modalContext'
import { useCategories } from '../../hooks/categories'

import { MasterLayout } from '../../layouts'
import { Header, Banner, LoadingScreen, NoData } from '../../components/shared'
import { CategoryFormModal } from './'
import Svg from '../../assets/header/others.svg'
import { Table, Pagination } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { IoEllipsisHorizontal } from 'react-icons/io5'

const CategoriesList = () => {
  const { state } = useContext(CategoriesContext)
  const { getCategories, setFilter, setPagination } = useCategories()

  useEffect(() => {
    getCategories(state.pageNumber, state.pageSize, state.filter)
  }, [state.pageNumber, state.pageSize, state.filter])

  // Actions Modal
  const {
    openCategoryModal,
    type,
    setType,
    actionCategory,
    setActionCategory,
  } = useModal()

  const actionTriggersClick = (e, category) => {
    const action = e.target.id
    console.log(action, category?.name)
    setActionCategory(category)
    switch (action) {
      case 'edit-category':
        setType('edit')
        break
      case 'delete-category':
        setType('delete')
        break
      default:
        setType('add')
    }
    openCategoryModal()
  }

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
          title='Categories List'
          description='You can now add your items that any user can order it from the Application and you can edit'
          imgUrl={Svg}
        />

        <Banner buttonTitle='Add Category' btnId={'add-category'}>
          <h4>Categories Table Details</h4>
          <p>you can check all categories details here!</p>
        </Banner>
      </div>

      {/* Filteration By name */}
      <div className='filteration d-flex justify-content-between align-items-center gap-3 my-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Search by name'
          value={state.filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Categories Table */}
      <div className='categories-table'>
        {state.loading ? (
          <div className='w-100 h-100 my-5 py-5 d-flex flex-column justify-content-center align-items-center gap-3'>
            <LoadingScreen />
          </div>
        ) : (
          <Table
            striped
            hover
            borderless
            responsive
            className='rounded rounded-5'
          >
            <thead className='rounded rounded-5'>
              <tr className='table-secondary h-md rounded rounded-5'>
                <th className='w-10 align-middle'>#</th>
                <th className='align-middle'>Name</th>
                <th className='align-middle'>Date</th>
                <th className='w-10 text-center align-middle'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.categories &&
              Array.isArray(state.categories) &&
              state.categories.length > 0 ? (
                state.categories.map((category, index) => (
                  <tr key={category.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{category.name}</td>
                    <td>
                      {new Date(category.creationDate).toLocaleDateString(
                        'en-US'
                      )}
                    </td>
                    <td>
                      <div className='dropdown d-flex justify-content-center'>
                        <span
                          className='cursor-pointer'
                          id='dropdownMenuButton'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          <IoEllipsisHorizontal />
                        </span>

                        <ul
                          className='dropdown-menu p-2'
                          aria-labelledby='dropdownMenuButton'
                        >
                          <li>
                            <p
                              className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center'
                              id='edit-category'
                              onClick={(e) => actionTriggersClick(e, category)}
                            >
                              <FaEdit className='pe-none' />
                              <span className='text-dark pe-none'>Edit</span>
                            </p>
                          </li>
                          <li>
                            <p
                              className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center m-0'
                              id='delete-category'
                              onClick={(e) => actionTriggersClick(e, category)}
                            >
                              <FaTrashAlt className='pe-none' />
                              <span className='text-dark pe-none'>Delete</span>
                            </p>
                          </li>
                        </ul>
                      </div>
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
      {!state.loading && (
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

      {/* Actions Modal */}
      <CategoryFormModal type={type} actionCategory={actionCategory} />
    </MasterLayout>
  )
}

export default CategoriesList
