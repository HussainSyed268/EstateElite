import React, { useEffect, useState } from "react";
import PropertyCard from "../components/Propertycard";

export default function PropertyCarousel(props) {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchTopRatedProperties();
    }, []);

    const fetchTopRatedProperties = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/property/top-rated-properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const propertiesWithImages = await fetchPropertyImages(data.properties);
            setProperties(propertiesWithImages);
        } catch (error) {
            console.error('Failed to fetch top-rated properties:', error);
        }
    };

    const fetchPropertyImages = async (properties) => {
        const propertiesWithImages = await Promise.all(properties.map(async property => {
            try {
                const response = await fetch(`http://localhost:5000/api/property/images/${property.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                property.images = data.images;
            } catch (error) {
                console.error(`Failed to fetch images for property ${property.id}:`, error);
                property.images = [];
            }
            return property;
        }));
        return propertiesWithImages;
    };

    return (
        <>
            <div className="mt-12 flex flex-col justify-start items-start">
                <h1 className="text-3xl font-raleway font-semibold my-10 ml-20 text-[#242424]">
                    {props.title}
                </h1>
                <div className="carousel-center carousel rounded-box w-full space-x-8 mb-20 overflow-x-scroll px-20">
                    {properties.map(property => (
                        <div key={property.id} className="min-w-[300px] flex-shrink-0 carousel-item">
                            <PropertyCard
                                img={property.images[0]?.image || 'default-image.jpg'}
                                title={property.name}
                                description={property.description}
                                rating={property.rating}
                                price={property.price}
                                type={property.type}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
