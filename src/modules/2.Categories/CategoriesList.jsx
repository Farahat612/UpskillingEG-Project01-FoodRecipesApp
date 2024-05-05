/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { CategoriesContext } from '../../contexts/categoriesContext'
import { useModal } from '../../contexts/modalContext'
import { useCategories } from '../../hooks/categories'

import { MasterLayout } from '../../layouts'
import { Header, Banner, LoadingScreen, NoData } from '../../components/shared'
import { CategoryFormModal } from '../../components/categories'
import Svg from '../../assets/header/others.svg'
import { Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { IoEllipsisHorizontal } from 'react-icons/io5'

const CategoriesList = () => {
  const { state } = useContext(CategoriesContext)
  const { getCategories } = useCategories()

  // getCategories when the component mounts
  useEffect(() => {
    getCategories()
  }, [])

  // Actions Modal
  const { openCategoryModal } = useModal()
  const [type, setType] = useState('add')
  const [actionCategory, setActionCategory] = useState(null)
  const actionTriggersClick = (e, category) => {
    const action = e.target.id
    setActionCategory(category)
    switch (action) {
      case 'edit-category':
        setType('edit')
        break
      case 'delete-category':
        setType('delete')
        break
      default:
        break
    }
    openCategoryModal()
  }

  return (
    <MasterLayout>
      {/* Header and Banner */}
      <div className='d-flex flex-column gap-3'>
        <Header
          title='Categories List'
          description='You can now add your items that any user can order it from the Application and you can edit'
          imgUrl={Svg}
        />

        <Banner
          buttonTitle='Add Category'
          btnId={'add-category'}
          setType={setType}
        >
          <h4>Categories Table Details</h4>
          <p>you can check all categories details here!</p>
        </Banner>
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
                <th className='align-middle'>Category Name</th>
                <th className='align-middle'>Category Date</th>
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
                              <FaEdit />
                              <span className='text-dark'>Edit</span>
                            </p>
                          </li>
                          <li>
                            <p
                              className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center m-0'
                              id='delete-category'
                              onClick={(e) => actionTriggersClick(e, category)}
                            >
                              <FaTrashAlt />
                              <span className='text-dark'>Delete</span>
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

      {/* Actions Modal */}
      <CategoryFormModal type={type} actionCategory={actionCategory} />
    </MasterLayout>
  )
}

export default CategoriesList
