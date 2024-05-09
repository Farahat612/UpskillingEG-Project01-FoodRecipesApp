import nodataImg from '../../assets/images/no-data.png'

const NoData = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5'>
      <img src={nodataImg} alt='No Data' />
      <h3>No Data!</h3>
      <p>Sorry, There is no data to show.</p>
    </div>
  )
}

export default NoData
