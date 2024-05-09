import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => {
  return (
    <>
      <Spinner
        animation='grow'
        variant='success'
        role='status'
        className='loading-spinner'
        size='2xl'
      />
      <h3 className='text-center text-success'>Loading ...</h3>
    </>
  )
}

export default LoadingScreen
