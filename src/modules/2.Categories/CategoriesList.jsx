import { useContext, useEffect } from 'react'
import { useModal } from '../../contexts/global/modalContext'
import { CategoriesContext } from '../../contexts/modules/categoriesContext'
import { useCategories } from '../../hooks/other'

import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import Svg from '../../assets/header/others.svg'
import { MasterLayout } from '../../layouts'
import {
  Banner,
  CustomPagination,
  DataTable,
  Header,
  NoData,
} from '../../modules/shared'
import { CategoryFormModal } from './'

const CategoriesList = () => {
  // context
  const { state } = useContext(CategoriesContext)
  const { getCategories, setFilter, setPagination } = useCategories()
  // Fetch Categories
  useEffect(() => {
    getCategories(state.pageNumber, state.pageSize, state.filter)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageNumber, state.pageSize, state.filter])

  // Actions Modal
  const { openCategoryModal, setType, setActionCategory } = useModal()
  const actionTriggersClick = (e, category) => {
    const action = e.target.id
    // console.log(action, category?.name)
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

  // Table Columns
  const tableColumns = ['Name', 'Date']

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
        <DataTable tableColumns={tableColumns}>
          {state.categories &&
          Array.isArray(state.categories) &&
          state.categories.length > 0 ? (
            state.categories.map((category, index) => (
              <tr key={category.id}>
                <th scope='row'>{index + 1}</th>
                <td>{category.name}</td>
                <td>
                  {new Date(category.creationDate).toLocaleDateString('en-US')}
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

      {/* Actions Modal */}
      <CategoryFormModal />
    </MasterLayout>
  )
}

export default CategoriesList
