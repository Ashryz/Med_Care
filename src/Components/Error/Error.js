import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div class="page-wrap d-flex flex-row align-items-center " style={{ height: "60vh" }}>
            <div class="container ">
                <div class="row justify-content-center">
                    <div class="col-md-12 text-center">
                        <span class="display-1 d-block"><spna className="prim-color">4</spna> <span className="sec-color">0</span> <span className="prim-color">4</span></span>
                        <div class="mb-4 lead">The page you are looking for was not found.</div>
                        <Link to='/' className='btn sec-btn btn-lg'>Home</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Error