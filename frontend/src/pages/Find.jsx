import React, { useState, useEffect } from "react";
import Filter from "../components/Filter.jsx";
import PropertyCard from "../components/Propertycard.jsx";
import Property1 from "../assets/property1.jpg";
import axios from "axios";

const Find = () => {
    const [filteredProperties, setFilteredProperties] = useState([]);

    const properties_ids = [];
    const [properties, setProperties] = useState([]);

  


    const handleFilteredProperties = (properties_ids) => {
        setFilteredProperties(properties_ids);
        const propertyIds = properties_ids.map(property => property.id);
        console.log(propertyIds);

        propertyIds.forEach((id) => {
            console.log(id);
            axios.get(`/api/property/info/${id}`)
                .then((response) => {
                    // Assuming properties is a state variable holding the fetched properties
                    setProperties( [
                        {
                            id: response.data.property.id,
                            img: response.data.images[0].image,
                            title: response.data.property.name,
                            description: response.data.property.description,
                            type: response.data.property.type,
                            price: response.data.property.price,
                            rating: response.data.property.rating
                        },
                    ]);
                    console.log(properties);
                })
                .catch((error) => {
                    console.error(`Failed to fetch property with ID ${id}:`, error);
                });
        });
    };
    

    
    useEffect(() => {
        // This effect will run whenever properties state changes
        // You can perform any additional actions here if needed
    }, [handleFilteredProperties]);


    
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
            <Filter onFilteredProperties={handleFilteredProperties} />
            <div className="flex flex-wrap justify-around gap-8 mx-8 mt-16 mb-8">
                {currentCards.map((property) => (
                    <PropertyCard
                        key={property.id}
                        img={property.img}
                        title={property.title}
                        description={property.description}
                        type={property.type}
                        price={property.price}
                        rating = {property.rating}
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
