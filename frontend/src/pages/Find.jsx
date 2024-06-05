import React, { useState } from "react";
import Filter from "../components/Filter.jsx";
import PropertyCard from "../components/Propertycard.jsx";
import Property1 from "../assets/property1.jpg";

const Find = () => {
    // Sample data for property cards
    const properties = [
        { id: 1, img: Property1, title: "Luxury Villa", description: "A beautiful luxury villa with a swimming pool.", type: "Villa", price: "25,000,000" },
        { id: 2, img: Property1, title: "Modern Apartment", description: "A modern apartment in the heart of the city.", type: "Apartment", price: "8,500,000" },
        { id: 3, img: Property1, title: "Cozy Cottage", description: "A cozy cottage in the countryside.", type: "Cottage", price: "4,200,000" },
        { id: 4, img: Property1, title: "Spacious Bungalow", description: "A spacious bungalow with a large garden.", type: "Bungalow", price: "15,000,000" },
        { id: 5, img: Property1, title: "Beach House", description: "A beach house with stunning ocean views.", type: "House", price: "20,000,000" },
        { id: 6, img: Property1, title: "Penthouse Suite", description: "A luxurious penthouse suite.", type: "Apartment", price: "30,000,000" },
        { id: 7, img: Property1, title: "Suburban Home", description: "A suburban home in a quiet neighborhood.", type: "House", price: "10,000,000" },
        { id: 8, img: Property1, title: "Country Farmhouse", description: "A charming farmhouse with acres of land.", type: "Farmhouse", price: "12,000,000" },
        { id: 9, img: Property1, title: "Downtown Loft", description: "A trendy loft in the downtown area.", type: "Loft", price: "9,000,000" },
        { id: 10, img: Property1, title: "Historic Mansion", description: "A historic mansion with classic architecture.", type: "Mansion", price: "40,000,000" },
        { id: 11, img: Property1, title: "Studio Apartment", description: "A compact and efficient studio apartment.", type: "Apartment", price: "5,000,000" },
        { id: 12, img: Property1, title: "Mountain Cabin", description: "A cozy cabin in the mountains.", type: "Cabin", price: "7,500,000" },
        { id: 13, img: Property1, title: "Urban Condo", description: "A sleek condo in the urban center.", type: "Condo", price: "11,000,000" },
        { id: 14, img: Property1, title: "Family Home", description: "A perfect family home with a backyard.", type: "House", price: "9,500,000" },
        { id: 15, img: Property1, title: "Luxury Apartment", description: "An upscale apartment with modern amenities.", type: "Apartment", price: "14,000,000" },
        { id: 16, img: Property1, title: "Waterfront Villa", description: "A stunning villa on the waterfront.", type: "Villa", price: "35,000,000" },
        { id: 17, img: Property1, title: "High-rise Apartment", description: "A high-rise apartment with city views.", type: "Apartment", price: "13,000,000" },
        { id: 18, img: Property1, title: "Ranch House", description: "A spacious ranch house with open land.", type: "House", price: "18,000,000" },
        { id: 19, img: Property1, title: "Elegant Townhouse", description: "An elegant townhouse in a prime location.", type: "Townhouse", price: "16,000,000" },
        { id: 20, img: Property1, title: "Green Home", description: "An eco-friendly home with sustainable features.", type: "House", price: "22,000,000" },
        { id: 21, img: Property1, title: "Modern Loft", description: "A modern loft with an open floor plan.", type: "Loft", price: "10,000,000" },
        { id: 22, img: Property1, title: "Rustic Cabin", description: "A rustic cabin with a wood-burning stove.", type: "Cabin", price: "6,000,000" },
        { id: 23, img: Property1, title: "City Penthouse", description: "A penthouse with panoramic city views.", type: "Penthouse", price: "28,000,000" },
        { id: 24, img: Property1, title: "Luxury Condo", description: "A luxury condo with top amenities.", type: "Condo", price: "19,000,000" },
        { id: 25, img: Property1, title: "Seaside Villa", description: "A villa with direct access to the beach.", type: "Villa", price: "33,000,000" },
        { id: 26, img: Property1, title: "Urban Studio", description: "A compact studio in a bustling area.", type: "Studio", price: "4,500,000" },
        { id: 27, img: Property1, title: "Charming Cottage", description: "A charming cottage with a lovely garden.", type: "Cottage", price: "7,000,000" },
        { id: 28, img: Property1, title: "Downtown Apartment", description: "An apartment in a prime downtown location.", type: "Apartment", price: "12,000,000" },
        { id: 29, img: Property1, title: "Eco Villa", description: "An eco-friendly villa with solar panels.", type: "Villa", price: "26,000,000" },
        { id: 30, img: Property1, title: "Spacious Townhouse", description: "A townhouse with a spacious interior.", type: "Townhouse", price: "17,000,000" }
    ];
    
    
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;

    // Calculate the indices of the cards to be shown on the current page
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = properties.slice(indexOfFirstCard, indexOfLastCard);

    const handleNextPage = () => {
        if (indexOfLastCard < properties.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
            <div className="text-lg breadcrumbs mx-8">
                <ul>
                    <li><a href="/" className="text-[#242424] hover:text-[#F9A826] transition-all">Home</a></li>
                    <li><a href="/find" className="text-[#242424] hover:text-[#F9A826] transition-all">Find Property</a></li>
                </ul>
            </div>
            <div className="font-raleway text-[4rem] font-bold mx-8 mt-4 max-[706px]:text-[3rem] max-[706px]:text-center max-[546px]:text-[2rem]">
                Find your next <span className="text-[#F9A826] font-philosopher">Home</span>
            </div>
            <Filter />
            <div className="flex flex-wrap justify-around gap-8 mx-8 mt-16 mb-8">
                {currentCards.map((property) => (
                    <PropertyCard
                        key={property.id}
                        img={property.img}
                        title={property.title}
                        description={property.description}
                        type={property.type}
                        price={property.price}
                    />
                ))}
            </div>
            <div className="flex justify-center my-8">
                {currentPage > 1 && (
                    <button
                        onClick={handlePreviousPage}
                        className="active:scale-95 rounded-lg  px-4 flex justify-center items-center  hover:text-white hover:bg-black transition-all py-2 font-medium text-black outline-none focus:ring hover:opacity-90"
                    >
                        <svg
                            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4"
                            />
                        </svg>
                        Previous
                    </button>
                )}
                {indexOfLastCard < properties.length && (
                    <button
                        onClick={handleNextPage}
                        className="active:scale-95 rounded-lg  px-4 flex justify-center items-center  hover:text-white hover:bg-black transition-all py-2 font-medium text-black outline-none focus:ring hover:opacity-90"
                    >
                        Next
                        <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </>
    );
};

export default Find;
