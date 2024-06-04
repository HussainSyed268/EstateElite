import React from 'react';
import HomeSection from '../components/HomeSection';
import AboutUs from '../components/AboutUs';
import PropertyCarousel from '../components/PropertyCarousel.jsx';
import Mission from '../components/Mission';


function Home() {
    return (
        <>
        <HomeSection/>
        <AboutUs/>
        <PropertyCarousel title="Top Rated Properties"/>
        <Mission/>  
        </>
    );
}

export default Home;