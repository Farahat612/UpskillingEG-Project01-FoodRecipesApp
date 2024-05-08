import { useEffect, useContext } from 'react'
import { FavoritesContext } from '../../contexts/favoritesContext'
import { useFavorites } from '../../hooks/favorites'

import { MasterLayout } from '../../layouts'
const UserFavourites = () => {
  const { state } = useContext(FavoritesContext)
  const { getFavorites } = useFavorites()

  useEffect(() => {
    getFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MasterLayout>
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-semibold mb-4'>Your Favourites</h1>
        {state.loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {!state.favorites.length > 0 ? (
              <li className='mb-2'>You have no favorites yet</li>
            ) : (
              state.favorites.map((item) => (
                <li key={item.id} className='mb-2'>
                  {item.recipe.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </MasterLayout>
  )
}

export default UserFavourites
