import './DoctorDetal.css'
import AboutDoctor from '../AboutDoctor/AboutDoctor';
import PastionReview from '../PastionReview/PastionReview';
function DoctorDetal(){
    const obj ={
    
        "id": 1,
        "age": "32",
        "area": "Giza",
        "fees": "600",
        "Image": "person.jpg",
        "email": "yusuf@gmail.com",
        "fname": "Yusuf",
        "lname": "Mohammad",
        "phone": "0102525600",
        "degree": "Consultant",
        "gender": "Male",
        "password": "Py12345",
        "specialization": "Cardiology and Thoracic Surgery (Heart & Chest)"
      
    }
return(
    <>
    <div className="container p-0 ">
<div className="row ser-card sm=8 border p-3 rounded-3 shadow me-3 mb-2 maindetal">

<div className='col col-2'>
   <img id='img' src='person.jpg'></img>

   </div>

<div className='col'>
<h5>Doctor Ghazy Abdelmaneem</h5>
<p>Consultant of diabetes and internal medicine</p>
<div>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
        <span id='span'>Overall Rating from 4 visitor</span>
</div>
<div className='row detales'>
    <div className='col col-9'>
    <p className='paragrah '>""</p>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>
    <img id='docimg' src="com.png"></img>

    </div>
    <div className='col'>

        <p>ممتاز</p>
    </div>

   </div>
   </div>
 
   <div className='col col-2'>
    <p>2177 Views(s)</p>
   </div>
</div>
    </div>
    

    </>
)




}export default DoctorDetal;