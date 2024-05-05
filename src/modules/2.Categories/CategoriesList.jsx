/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { CategoriesContext } from '../../contexts/categoriesContext'
import { useCategories } from '../../hooks/categories'

import { MasterLayout } from '../../layouts'
import { Header, Banner, LoadingScreen } from '../../components/shared'
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

      {/* Categories Table */}
      <div className='categories-table'>
        <Table
          striped
          hover
          borderless
          responsive
          className='rounded rounded-5'
        >
          {state.loading ? (
            <div className='w-100 h-100 my-5 py-5 d-flex flex-column justify-content-center align-items-center gap-3'>
              <LoadingScreen />
            </div>
          ) : (
            <>
              <thead className='rounded rounded-5'>
                <tr className='table-secondary h-md rounded rounded-5'>
                  <th className='w-10 align-middle'>#</th>
                  <th className='align-middle'>Category Name</th>
                  <th className='align-middle'>Category Date</th>
                  <th className='w-10 text-center align-middle'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.categories && Array.isArray(state.categories)
                  ? state.categories.map((category, index) => (
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
                                {/* // ! Here */}
                                <p
                                  className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center'
                                  id='edit-category'
                                >
                                  <FaEdit />
                                  <span className='text-dark'>Edit</span>
                                </p>
                              </li>
                              <li>
                                <p
                                  className='dropdown-item cursor-pointer text-success d-flex gap-3 align-items-center m-0'
                                  id='delete-category'
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
                  : null}
              </tbody>
            </>
          )}
        </Table>
      </div>
    </MasterLayout>
  )
}

export default CategoriesList
