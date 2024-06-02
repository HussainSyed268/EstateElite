import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import PropertyCarousel from "./components/PropertyCarousel";
import AboutUs from "./components/AboutUs";
import Mission from "./components/Mission";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
    <Navbar/>
    <HomeSection/>
    <AboutUs/>
    <PropertyCarousel/>
    <Mission/>  
    <Footer/>
    
  
    </div>
  );
}

export default App;
