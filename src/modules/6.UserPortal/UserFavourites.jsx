import { useEffect, useContext } from 'react'
import { FavoritesContext } from '../../contexts/modules/favoritesContext'
import { useFavorites } from '../../hooks/other'
import { staticURL } from '../../utils/api'

import { MasterLayout } from '../../layouts'
import { Header, NoData, LoadingScreen } from '../shared'
import { Card } from 'react-bootstrap'
import { FaHeart } from 'react-icons/fa'

import Svg from '../../assets/header/others.svg'

const UserFavourites = () => {
  const { state } = useContext(FavoritesContext)
  const { getFavorites, removeFromFavorites } = useFavorites()

  useEffect(() => {
    getFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MasterLayout>
      <Header
        title='Favorites Items'
        description='You can now add your items that any user can order it from the Application and you can edit'
        imgUrl={Svg}
      />
      <div className='container mx-auto px-0'>
        {state.loading ? (
          <div className='w-100 h-100 my-5 py-5 d-flex flex-column justify-content-center align-items-center gap-3'>
            <LoadingScreen />
          </div>
        ) : (
          <div>
            {!state.favorites.length > 0 ? (
              <div>
                <NoData />
              </div>
            ) : (
              <div className='d-flex gap-3 flex-wrap justify-content-start m-0'>
                {state.favorites.map((item) => (
                  <div key={item.id} className='mb-2'>
                    <Card
                      className='position-relative'
                      style={{
                        maxWidth: '18rem',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      <span
                        onClick={() => removeFromFavorites(item.id)}
                        className='position-absolute wishlist bg-white px-2 py-1 rounded rounded-2 border border-dark'
                      >
                        <FaHeart size={'20'} className='text-success' />
                      </span>
                      <Card.Img
                        className='fav-img'
                        variant='top'
                        src={`${staticURL}/${item.recipe.imagePath}`}
                      />
                      <Card.Body>
                        <Card.Title className='mb-1'>
                          {item.recipe.name}
                        </Card.Title>
                        <Card.Text className='mb-1'>
                          {item.recipe.description}
                        </Card.Text>
                        <Card.Text className='mb-1'>
                          {item.recipe.price}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MasterLayout>
  )
}

export default UserFavourites
