//  PropTypes
import PropTypes from 'prop-types'
// react hooks
import { useContext } from 'react'
// Contexts
import { CategoriesContext } from '../../contexts/modules/categoriesContext'
import { RecipesContext } from '../../contexts/modules/recipesContext'
import { FavoritesContext } from '../../contexts/modules/favoritesContext'
import { UsersContext } from '../../contexts/modules/usersContext'

// Local Components
import { LoadingScreen } from './'
// Third-Party Components
import { Table } from 'react-bootstrap'

const DataTable = ({ tableColumns, children }) => {
  const { state: categoriesState } = useContext(CategoriesContext)
  const { state: recipesState } = useContext(RecipesContext)
  const { state: favoritesState } = useContext(FavoritesContext)
  const { state: usersState } = useContext(UsersContext)
  return (
    <>
      {categoriesState.loading ||
      recipesState.loading ||
      favoritesState.loading ||
      usersState.loading ? (
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
              {tableColumns.map((column, index) => (
                <th key={index} className='align-middle'>
                  {column}
                </th>
              ))}
              <th className='w-10 text-center align-middle'>Actions</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </Table>
      )}
    </>
  )
}

export default DataTable

DataTable.propTypes = {
  children: PropTypes.node.isRequired,
  tableColumns: PropTypes.array.isRequired,
}
