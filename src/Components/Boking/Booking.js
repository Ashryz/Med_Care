import Carousel from 'react-bootstrap/Carousel';
import './Boking.css'
import { Button } from 'react-bootstrap';
function Booking() {
  return (
    <>
    <div className="row booking">
      <div className='col ser-card sm=8 border p-3 rounded-3 shadow me-3 mb-2 book'>
      <p id='day' >To day</p>
             <p className='appo'>from 1am t0 5pm</p>
             <p className='appo'>from 1am t0 5pm</p>

           <p className='appo'>from 1am t0 5pm</p>

            <Button id='btn' variant="danger">Boking</Button>{' '}

      </div>
      <div className='col ser-card sm=8 border p-3 rounded-3 shadow me-3 mb-2 book'>
      <p id='day' >To day</p>
             <p className='appo'>from 1am to 5pm</p>
             <p className='appo'>from 1am to 5pm</p>

           <p className='appo'>from 1am to 5pm</p>

            <Button id='btn' variant="danger">Boking</Button>{' '}

      </div>     
      
      <div className='col ser-card sm=8 border p-3 rounded-3 shadow me-3 mb-2 book'>
      <p id='day' >To day</p>
             <p className='appo'>from 1am t0 5pm</p>
             <p className='appo'>from 1am t0 5pm</p>

           <p className='appo'>from 1am t0 5pm</p>

            <Button id='btn' variant="danger">Boking</Button>{' '}

      </div>
      </div>
        
    
    </>
    // <Carousel id='cer '>
    //   <Carousel.Item className='ser-card sm=8 border p-3 rounded-3 shadow me-3 mb-2 book'>
    //     <div className='row  '>
    //       <div className='col'>
    //         <p id='day' >To day</p>
    //         <p className='appo'>from 1am t0 5pm</p>
    //         <p className='appo'>from 1am t0 5pm</p>

    //         <p className='appo'>from 1am t0 5pm</p>

    //         <Button id='btn' variant="danger">Boking</Button>{' '}
    //       </div>
    //       {/* <div className='col'>
    //         <p id='day' >To day</p>
    //         <p className='appo'>from 1am t0 5pm</p>
    //         <p className='appo'>from 1am t0 5pm</p>

    //         <p className='appo'>from 1am t0 5pm</p>

    //         <Button id='btn' variant="secondary">Boking</Button>{' '}
    //       </div>
    //       <div className='col'>
    //         <p id='day' >To day</p>
    //         <p className='appo'>from 1am t0 5pm</p>
    //         <p className='appo'>from 1am t0 5pm</p>

    //         <p className='appo'>from 1am t0 5pm</p>

    //         <Button id='btn' variant="secondary">Boking</Button>{' '}
    //       </div> */}
    //     </div>
    //   </Carousel.Item>
    //   {/* <Carousel.Item>
    //     <div className='row'>
    //       <div className='col'>
    //         <p id='day' >To day</p>
    //         <p className='appo'>from 1am t0 5pm</p>
    //         <p className='appo'>from 1am t0 5pm</p>

    //         <p className='appo'>from 1am t0 5pm</p>

    //         <Button id='btn' variant="secondary">Boking</Button>{' '}
    //       </div>
    //       <div className='col'>
    //         <p id='day' >To day</p>
    //         <p className='appo'>from 1am t0 5pm</p>
    //         <p className='appo'>from 1am t0 5pm</p>

    //         <p className='appo'>from 1am t0 5pm</p>

    //         <Button id='btn' variant="secondary">Boking</Button>{' '}
    //       </div>
    //       <div className='col'>
    //         <p id='day' >To day</p>
    //         <p className='appo'>from 1am t0 5pm</p>
    //         <p className='appo'>from 1am t0 5pm</p>

    //         <p className='appo'>from 1am t0 5pm</p>

    //         <Button id='btn' variant="secondary">Boking</Button>{' '}
    //       </div>
    //     </div>
    //   </Carousel.Item> */}
    //   {/* <Carousel.Item>
    //   <img
    //     className="d-block w-100"
    //     src="https://images.pexels.com/photos/16124727/pexels-photo-16124727/free-photo-of-a-necklace-an-a-box-on-a-black-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     alt="third slide"
    //   />
    // </Carousel.Item>
    // <Carousel.Item>
    //   <img
    //     className="d-block w-100"
    //     src="https://images.pexels.com/photos/6311250/pexels-photo-6311250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     alt="third slide"
    //   />
    // </Carousel.Item> */}
    // </Carousel>
  );
}

export default Booking;