import React, { useState } from "react";
import PropertyCard from "./Propertycard";
import Property1 from "../assets/property1.jpg";
import Logo from "../assets/logo/logo-black-yellow.png";

const propertiesList = [
    { id: 1, img: Property1, title: "Luxury Condo", description: "A luxury condo with top amenities.", type: "Condo", price: "19,000,000" },
    { id: 2, img: Property1, title: "Seaside Villa", description: "A villa with direct access to the beach.", type: "Villa", price: "33,000,000" },
    { id: 3, img: Property1, title: "Urban Studio", description: "A compact studio in a bustling area.", type: "Studio", price: "4,500,000" },
    { id: 4, img: Property1, title: "Charming Cottage", description: "A charming cottage with a lovely garden.", type: "Cottage", price: "7,000,000" },
    { id: 5, img: Property1, title: "Downtown Apartment", description: "An apartment in a prime downtown location.", type: "Apartment", price: "12,000,000" },
    { id: 6, img: Property1, title: "Eco Villa", description: "An eco-friendly villa with solar panels.", type: "Villa", price: "26,000,000" },
    { id: 7, img: Property1, title: "Spacious Townhouse", description: "A townhouse with a spacious interior.", type: "Townhouse", price: "17,000,000" }
];

function ListedProperties() {
    const [properties, setProperties] = useState(propertiesList);
    const [selectedProperties, setSelectedProperties] = useState([]);

    const handleSelectProperty = (id) => {
        setSelectedProperties((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((propertyId) => propertyId !== id)
                : [...prevSelected, id]
        );
    };

    const handleRemoveSelected = () => {
        setProperties((prevProperties) =>
            prevProperties.filter((property) => !selectedProperties.includes(property.id))
        );
        setSelectedProperties([]);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">Listed Properties</h1>
            {selectedProperties.length > 0 && (
                <button
                    className="mt-5 mb-5 px-4 py-2 bg-red-600 text-white rounded-lg"
                    onClick={handleRemoveSelected}
                >
                    Remove Selected Properties
                </button>
            )}
            {properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${selectedProperties.includes(property.id) ? 'border-4 border-red-500 rounded-2xl' : ''}`}
                            onClick={() => handleSelectProperty(property.id)}
                        >
                            <PropertyCard
                                img={property.img}
                                title={property.title}
                                description={property.description}
                                type={property.type}
                                price={property.price}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-10">
                    <img src={Logo} alt="Logo" className="h-64 w-64" />
                    <p className="text-center font-semibold mb-5">No properties listed yet.</p>
                </div>
            )}
        </div>
    );
};

export default ListedProperties;
