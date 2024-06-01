import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import PropertyCarousel from "./components/PropertyCarousel";
import AboutUs from "./components/AboutUs";


function App() {
  return (
    <div className="App">
    <Navbar/>
    <HomeSection/>
    <PropertyCarousel/>
    <AboutUs/>
  
    </div>
  );
}

export default App;
