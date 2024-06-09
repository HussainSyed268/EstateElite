import React, { useEffect, useState, useContext } from "react";
import PropertyCard from "./Propertycard";
import Logo from "../assets/logo/logo-black-yellow.png";
import {AuthContext} from "../context/AuthContext";

const SavedProperties = () => {
  const {auth} = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const userId = auth.user.id; // Example user ID, replace with actual user ID logic

    useEffect(() => {
        fetchSavedProperties();
    }, []);

    const fetchSavedProperties = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/save/saved/${userId}`);
            const data = await response.json();

            const propertiesWithImages = await Promise.all(
                data.map(async (item) => {
                    const property = item.Property;
                    try {
                        const imageResponse = await fetch(`http://localhost:5000/api/property/images/${property.id}`, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },});
                        const imageData = await imageResponse.json();
                        const img = imageData.images[0] || "default-image.jpg";
                        return {
                            id: property.id,
                            image:img,
                            title: property.name,
                            description: property.description,
                            type: property.type,
                            price: property.price,
                            rating: property.rating,
                        };
                    } catch (imageError) {
                        console.error(`Failed to fetch image for property ID ${property.id}:`, imageError);
                        return {
                            id: property.id,
                            image: "default-image.jpg", // Use default image on error
                            title: property.name,
                            description: property.description,
                            type: property.type,
                            price: property.price,
                            rating: property.rating,
                        };
                    }
                })
            );

            console.log("Properties with images:", propertiesWithImages);
            setProperties(propertiesWithImages);
            console.log("Properties:", properties);
        } catch (error) {
            console.error('Failed to fetch saved properties:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">Saved Properties</h1>
            {properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
                    {properties.map((property) => (
                        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <PropertyCard
                                id={property.id}
                                img={property.image.image}
                                title={property.title}
                                rating={property.rating}
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
                    <p className="text-center font-semibold mb-5">You have not saved any properties yet.</p>
                </div>
            )}
        </div>
    );
};

export default SavedProperties;
