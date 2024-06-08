import React, { useState, useContext, useEffect } from "react";
import PropertyCard from "./Propertycard";
import Logo from "../assets/logo/logo-black-yellow.png";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function ListedProperties() {
    const { auth } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`/api/users/properties/${auth.user.id}`);
                const allProperties = response.data.properties.map((property) => ({
                    id: property.id,
                    title: property.name,
                    description: property.description,
                    type: property.type,
                    price: property.price,
                    rating: property.rating,
                }));

                const propertiesWithImages = await Promise.all(
                    allProperties.map(async (property) => {
                        const imageResponse = await axios.get(`/api/property/info/${property.id}`);
                        return {
                            ...property,
                            img: imageResponse.data.images[0]?.image || null,
                        };
                    })
                );

                setProperties(propertiesWithImages);
            } catch (error) {
                console.error('Failed to fetch properties:', error);
            }
        };

        fetchProperties();
    }, [auth.user.id]);

    const handleSelectProperty = (id) => {
        setSelectedProperties((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((propertyId) => propertyId !== id)
                : [...prevSelected, id]
        );
    };

    const handleRemoveSelected = () => {
        selectedProperties.forEach(async (propertyId) => {
            try {
                await axios.get(`/api/users/delete/${propertyId}`);
                console.log('Property deleted successfully');
                setProperties((prevProperties) => prevProperties.filter((property) => property.id !== propertyId));
            } catch (error) {
                console.error('Failed to delete property:', error);
            }
        });
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
                                id = {property.id}
                                img={property.img}
                                title={property.title}
                                description={property.description}
                                type={property.type}
                                price={property.price}
                                rating = {property.rating}
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
            {console.log(selectedProperties)}
        </div>
    );
}

export default ListedProperties;
