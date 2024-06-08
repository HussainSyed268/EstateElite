import React, { useState, useEffect,useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaStairs } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { PiToilet } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { LiaChartAreaSolid } from "react-icons/lia";
import PropertyCarousel from "../components/PropertyCarousel";
import { useParams } from "react-router-dom";
import axios from 'axios';
import * as PANOLENS from "panolens";

const Property = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [images, setImages] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [displayedImages, setDisplayedImages] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const panolensContainerRef = useRef(null);
    let viewer;



    const getPropertyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/property/${propertyId}`);
            setProperty(response.data.property);
            setImages(response.data.images);
        } catch (error) {
            console.error('Error fetching property details:', error);
        }
    };

    useEffect(() => {
        getPropertyDetails();
    }, [propertyId]);

    useEffect(() => {
        const updateDisplayedImages = () => {
            const width = window.innerWidth;
            if (width <= 640) {
                setDisplayedImages(1); // max-sm
            } else if (width <= 768) {
                setDisplayedImages(4); // max-md
            } else {
                setDisplayedImages(5); // default
            }
        };

        updateDisplayedImages(); // Update on initial render
        window.addEventListener('resize', updateDisplayedImages);

        return () => window.removeEventListener('resize', updateDisplayedImages);
    }, []);

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };


  const initializePanolens = () => {
    const selectedImage = images[currentImageIndex];
    if (selectedImage.is360) {
      const container = panolensContainerRef.current;
      if (container) {
        container.innerHTML = ""; // Clear previous instance

        const imageUrl = selectedImage.image.startsWith('data:image') ? selectedImage.image : `data:image/jpeg;base64,${selectedImage.image}`;
        console.log("Panolens Image URL:", imageUrl);

        const panorama = new PANOLENS.ImagePanorama(imageUrl);
        console.log("Panolens Panorama Object:", panorama);

        viewer = new PANOLENS.Viewer({ container: container });
        viewer.add(panorama);
        console.log("Panolens Viewer Initialized:", viewer);
      } else {
        console.error("Panolens container is not available");
      }
    } else {
      console.log("Selected image is not a 360 image");
    }
  };


  const openModal = (index) => {
    console.log("openModal called for index:", index);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

    useEffect(() => {
    if (isModalOpen) {
        initializePanolens();
    }
    }, [currentImageIndex, isModalOpen]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const additionalImagesCount = images.length > displayedImages ? images.length - displayedImages : 0;

    const capitalizeFLetter = (string) => {
        return string ? (string[0].toUpperCase() + string.slice(1)) : '';
    };

    function numberToWord(number) {
        const numberWords = {
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six"
        };
        return numberWords[number] || "Number out of range";
    }

    if (!property || images.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative bg-white p-4 rounded-lg w-[90vw] h-[90vh] sm:w-[70vw] sm:h-[70vh] flex items-center justify-center">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-black text-3xl">&times;</button>
                        <button onClick={goToPreviousImage} className="absolute left-4 text-black text-3xl">
                            <FaChevronLeft />
                        </button>
                        {images[currentImageIndex]?.is360 ? (
              <div id="panolens-container" ref={panolensContainerRef} className="w-full h-full"></div>
            ) : (
                            <img src={images[currentImageIndex].image} alt={`Property ${currentImageIndex + 1}`} className="w-full h-full object-cover rounded-lg" />
                        )}
                        <button onClick={goToNextImage} className="absolute right-4 text-black text-3xl">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}
            <div className="text-lg breadcrumbs mx-8 mb-8">
                <ul>
                    <li><a href="/" className="text-[#242424] hover:text-[#F9A826] transition-all">Home</a></li>
                    <li><a href="/find" className="text-[#242424] hover:text-[#F9A826] transition-all">Find Property</a></li>
                </ul>
            </div>
            <div className="relative mx-8 p-6 sm:p-8 bg-slate-200 rounded-xl max-sm:block max-sm:h-[90vw] grid grid-cols-1 sm:h-[35rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-evenly">
                {images.slice(0, displayedImages).map((image, index) => (
                    <div
                        key={index}
                        className={`rounded-lg h-full ${index === 0 ? "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2" : ""} overflow-hidden`}
                        onClick={() => openModal(index)}
                    >
                        <img src={image.image} alt={`Property ${index + 1}`} className="w-full h-full object-cover rounded-lg cursor-pointer" />
                    </div>
                ))}
                {additionalImagesCount > 0 && (
                    <div className="absolute bottom-10 right-10 bg-black text-white p-2 rounded-lg">
                        +{additionalImagesCount}
                    </div>
                )}
            </div>


    <div className="flex items-center justify-between font-raleway text-[4rem] font-bold mx-10 mt-4 max-[706px]:text-[3rem] max-[546px]:text-[2rem]">
        <h1>
            {capitalizeFLetter(property?.name)}
        </h1>
        <div className="flex gap-4 mr-8">
        <button
                        className="flex items-center justify-center w-12 h-12 bg-white border-gray-400 border rounded-full text-gray-800 active:bg-gray-800 active:text-white"
                    >
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.516 6.743c-.41-.368-.443-1-.077-1.41a.99.99 0 0 1 1.405-.078l5.487 4.948.007.006A2.047 2.047 0 0 1 22 11.721a2.06 2.06 0 0 1-.662 1.51l-5.584 5.09a.99.99 0 0 1-1.404-.07 1.003 1.003 0 0 1 .068-1.412l5.578-5.082a.05.05 0 0 0 .015-.036.051.051 0 0 0-.015-.036l-5.48-4.942Zm-6.543 9.199v-.42a4.168 4.168 0 0 0-2.715 2.415c-.154.382-.44.695-.806.88a1.683 1.683 0 0 1-2.167-.571 1.705 1.705 0 0 1-.279-1.092V15.88c0-3.77 2.526-7.039 5.967-7.573V7.57a1.957 1.957 0 0 1 .993-1.838 1.931 1.931 0 0 1 2.153.184l5.08 4.248a.646.646 0 0 1 .012.011l.011.01a2.098 2.098 0 0 1 .703 1.57 2.108 2.108 0 0 1-.726 1.59l-5.08 4.25a1.933 1.933 0 0 1-2.929-.614 1.957 1.957 0 0 1-.217-1.04Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        
                    </button>
            

        <button
                    onClick={toggleSave}
                    className={`flex items-center justify-center w-12 h-12 bg-white border-gray-400 border rounded-full hover:text-[#F9A826] ${isSaved ? "text-[#F9A826]" : "text-gray-400"}`}
                >
                    <svg
                        className="w-6 h-6"
                        fill={isSaved ? "#F9A826" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 3v18l7-5 7 5V3z"
                        ></path>
                    </svg>
                </button>
</div>
    </div>
    <div className="mx-10 mt-2 font-raleway text-stone-500 text-[1.5rem]  max-[706px]:text-[1.5rem] max-[546px]:text-[1rem]">
    <h>
        {capitalizeFLetter(property?.address)} - {capitalizeFLetter(property?.city)}, {capitalizeFLetter(property?.country)}
    </h>
    
</div>

    <div className="grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2  rounded-xl bg-slate-300 mt-12 mx-12 md:h-[15rem] lg:h-[12rem] xl:h-[8rem]">
        <div className="flex pl-6 flex-col justify-center col-span-1 bg-white border border-slate-300 h-full rounded-l-xl">
            <div className="font-raleway text-stone-500 text-[1.3rem]  max-[706px]:text-[1.3rem] max-[546px]:text-[1rem]">
                Property Type
            </div>
            <div className="flex items-center my-2 gap-4 font-raleway  text-[1.5rem] font-bold   max-[706px]:text-[1.5rem] max-[546px]:text-[1rem]">
            <FaHouse className="text-stone-500" />
                <h1 className="text-black">
                    {capitalizeFLetter(property?.type)}
                </h1>
            </div>
        </div>
        <div className=" flex pl-6 flex-col justify-center col-span-1 bg-white border border-slate-300 h-full">
        <div className="font-raleway text-stone-500 text-[1.3rem]  max-[706px]:text-[1.3rem] max-[546px]:text-[1rem]">
                Storeys
            </div>
            <div className="flex items-center my-2 gap-4 font-raleway  text-[1.5rem] font-bold   max-[706px]:text-[1.5rem] max-[546px]:text-[1rem]">
            <FaStairs className="text-stone-500" />
                <h1 className="text-black">
                    { capitalizeFLetter(numberToWord(property?.storeys))}
                </h1>
            </div>
        </div>
        <div className="flex pl-6 flex-col justify-center col-span-1 bg-white border border-slate-300 h-full">
        <div className="font-raleway text-stone-500 text-[1.3rem]  max-[706px]:text-[1.3rem] max-[546px]:text-[1rem]">
                Bedrooms
            </div>
            <div className="flex items-center my-2 gap-4 font-raleway  text-[1.5rem] font-bold   max-[706px]:text-[1.5rem] max-[546px]:text-[1rem]">
            <FaBed className="text-stone-500" />
                <h1 className="text-black">{ capitalizeFLetter(numberToWord(property?.bedrooms))}</h1>
            </div>
        </div>
        <div className="flex pl-6 flex-col justify-center col-span-1 bg-white border border-slate-300 h-full">
        <div className="font-raleway text-stone-500 text-[1.3rem]  max-[706px]:text-[1.3rem] max-[546px]:text-[1rem]">
                Bathrooms
            </div>
            <div className="flex items-center my-2 gap-4 font-raleway  text-[1.5rem] font-bold   max-[706px]:text-[1.5rem] max-[546px]:text-[1rem]">
            <PiToilet className="text-stone-500" />
                <h1 className="text-black">{ capitalizeFLetter(numberToWord(property?.bathrooms))}</h1>
            </div>
        </div>
        <div className="flex pl-6 flex-col justify-center col-span-1 bg-white border border-slate-300 h-full">
        <div className="font-raleway text-stone-500 text-[1.3rem]  max-[706px]:text-[1.3rem] max-[546px]:text-[1rem]">
                Parking Space
            </div>
            <div className="flex items-center my-2 gap-4 font-raleway  text-[1.5rem] font-bold   max-[706px]:text-[1.5rem] max-[546px]:text-[1rem]">
            <FaCar className="text-stone-500" />
            <h1 className="text-black">
            {property?.parking_space ? "Yes" : "No"}
        </h1>
            </div>
        </div>
        <div className="flex pl-6 flex-col justify-center col-span-1 bg-white border border-slate-300 h-full rounded-r-xl">
        <div className="font-raleway text-stone-500 text-[1.3rem]  max-[706px]:text-[1.3rem] max-[546px]:text-[1rem]">
                Area of Property
            </div>
            <div className="flex items-center my-2 gap-4 font-raleway  text-[1.5rem] font-bold   max-[706px]:text-[1.5rem] max-[546px]:text-[1rem]">
            <LiaChartAreaSolid className="text-stone-500" />
                <h1 className="text-black">{property?.area} {capitalizeFLetter(property?.area_unit)}</h1>
            </div>                         
        </div>
    </div>
    <h1 className="font-raleway text-[2rem] font-bold mx-10 mt-8 max-[706px]:text-[2rem] max-[546px]:text-[2rem]">
            Description
        </h1>
        <p className="font-raleway text-stone-500 text-[1.2rem]  mx-10 max-[706px]:text-[1.2rem] max-[546px]:text-[1rem]">
            {capitalizeFLetter(property?.description)}
            </p>

        <div className="flex flex-col items-end mx-8">
        <h1 className="font-raleway text-stone-500 text-[1.2rem] font-bold mx-10 mt-8 max-[706px]:text-[1.2rem] max-[546px]:text-[1rem]">
        Seller's Quote
        </h1>
            <h1 className="font-raleway text-[2.5rem] font-bold mx-10  max-[706px]:text-[2.5rem] max-[546px]:text-[2rem]">
            PKR {property?.price}{property?.listing_reason === "rent" ? "/Month" : ""}
            </h1>
            <button class="active:scale-95 rounded-2xl mx-8 mt-2  px-6  hover:text-white border border-slate-300 hover:bg-black hover:border-black transition-all py-2 font-raleway font-medium text-black outline-none focus:ring hover:opacity-90">Contact Seller</button>
        </div>
        <PropertyCarousel title="Properties in Same Area" />


        </>
    );
}

export default Property;