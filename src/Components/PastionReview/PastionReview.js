
function PastionReview() {
    const rev = {
        id: "12",
        doctor: "id",
        patient: "id",
        appointment: "id",
        rating: "5",
        review: "الخدمنة جيدة جدا",
        date:"2/2/2020",

    }
    return (

        <div patientid={rev.patient} doctorid={rev.doctor} appointmentid={rev.appointment}>
            <div className="container ser-card sm=8 border p-3 rounded-3 shadow me-3 mb-2" >

                <div className="col p-2">
                    <img id='docimg' src="com.png"></img>
                    <img id='docimg' src="com.png"></img>
                    <img id='docimg' src="com.png"></img>
                    <img id='docimg' src="com.png"></img>
                    <img id='docimg' src="com.png"></img>

                    <p>review</p>
                    <p>ممتاز</p>
                    <p>visitor 2</p>
                    <p>monday,2 Fep 2020  </p>

                </div>


            </div>


        </div>

    )



} export default PastionReview;