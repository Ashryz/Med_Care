import React from 'react'
// import Hero from './Components/Hero/Hero'
import Hero from './Pages/Hero/Hero'
import TempHome from './Components/TempHome/TempHome'
import OfferSlider from './Components/Offer/Offer'
import HealthcareServices from './Components/HealthcareServices/HealthcareServices'
export default function Home() {
    return (
        <div className='container-fluid p-0'>
            <Hero />
            <TempHome />
            <OfferSlider/>
            <HealthcareServices/>
        </div>

    )

}
