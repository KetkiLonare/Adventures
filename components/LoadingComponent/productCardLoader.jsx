import React from 'react'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAppContext } from '@/src/hooks/UserContext';

const Skeleton = ({ width = "100%", height = ".8rem", margin = "0", rounded = "0" }) => {
    return <span className="skeleton-box" style={{ width, height, margin, borderRadius: rounded }}></span>
}

const ProductCardLoader = ({ cardimg=[],name, category_name, floorimage,square_feet, no_of_bedrooms, no_of_bathrooms, id, }) => {
    const { state, dispatch } = useAppContext();
  return (
    <>
      <Card className='w-fit cardBoxShadow border-0 mb-4'>
        <Link href={`/requestInformation?id=${id}`}  className='cardTopImgDiv' >
        
        {/* <Card.Img variant="top" src="/images/home1.png" alt='Home1' /> */}
        <Skeleton height="100%" />
  
   
        </Link>
        <Card.Body>
          <Card.Title className='FW-semibold FS-16 capitalize'><Skeleton/></Card.Title>
          <Card.Text className='FS-12 capitalize'>
            Category : <Skeleton width="50%" />
          </Card.Text>
        </Card.Body>
        <Card.Body className='px-0 py-0'>
          <div className='row py-2 border-top border-bottom mx-0 w-full'>
            <div className='col border-end d-flex justify-center items-center flex-col'>
              <i className='icon-area FS-24'></i>
              <Skeleton/>
              
              {/* <Placeholder as={Card.Text} animation="glow" className='FW-bold'>
              <span className='FW-bold'></span>
              </Placeholder> */}
            </div>
            <div className='col border-end d-flex justify-center items-center flex-col'>
              <i className='icon-bed FS-24'></i>
              <Skeleton/>
              {/* <span className='FW-bold'></span> */}
            </div>
            <div className='col d-flex justify-center items-center flex-col'>
              <i className='icon-bath-tub FS-24'></i>
              <Skeleton/>
              {/* <span className='FW-bold'>{no_of_bathrooms}</span> */}
            </div>
          </div>
        </Card.Body>
        <Card.Body className='d-flex justify-between py-3'>
          <Card.Link className='text-decoration-none FS-14 FW-semibold'>View Details</Card.Link>
          <div className='text-decoration-none FS-20' itemType='button' onClick={()=>((state.logout === false) && dispatch({type:"Wishlist",payload:id}))}><i className='icon-like' style={{color: (state.wishlist.includes(id))  ? '#ac124a' : '#d6d6d6'}} ></i></div>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductCardLoader