import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => {
  return (
    <div className='vw-100 vh-100 d-flex justify-content-center align-items-center gap-4 flex-column'>
      <Spinner
        animation='grow'
        variant='success'
        role='status'
        className='loading-spinner'
        size='2xl'
      />
      <h3 className='text-center text-success'>Loading ...</h3>
    </div>
  )
}

export default LoadingScreen
