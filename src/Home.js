import React from 'react'
import Hero from './Components/Hero/Hero'
import TempHome from './Components/TempHome/TempHome'
import OfferSlider from './Components/Offer/Offer'
export default function Home() {
    return (
        <div className='container-fluid p-0'>
            <Hero />
            <TempHome />
            <OfferSlider/>
        </div>

    )

}
