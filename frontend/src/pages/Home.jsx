import React from 'react';
import HomeSection from '../components/HomeSection';
import AboutUs from '../components/AboutUs';
import PropertyCarousel from '../components/PropertyCarousel';
import Mission from '../components/Mission';


function Home() {
    return (
        <>
        <HomeSection/>
        <AboutUs/>
        <PropertyCarousel/>
        <Mission/>  
        </>
    );
}

export default Home;