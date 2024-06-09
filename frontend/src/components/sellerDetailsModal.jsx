import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerDetailsModal = ({ sellerId, isOpen, onClose }) => {
    const [sellerDetails, setSellerDetails] = useState(null);

    useEffect(() => {
        if (isOpen && sellerId) {
            const fetchSellerDetails = async () => {
                try {
                    const response = await axios.post(`http://localhost:5000/api/users/user/${sellerId}`);
                    setSellerDetails(response.data);
                } catch (error) {
                    console.error('Error fetching seller details:', error);
                }
            };

            fetchSellerDetails();
        }
    }, [isOpen, sellerId]);

    const handleCloseModal = (e) => {
        // Check if the click is outside the modal content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !sellerDetails) {
        return null;
    }

    const { user, userProfile } = sellerDetails;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleCloseModal}>
            <div className="bg-white p-6 rounded-lg w-[40rem] sm:w-[50vw]" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-black text-2xl">&times;</button>
                <div className="flex flex-col items-center">
                {userProfile.profile_picture && (
                        <img src={userProfile.profile_picture} alt="Profile" className="w-24 h-24 rounded-full mt-4 mb-8" />
                    )}
                    <h2 className="text-2xl font-bold mb-2">{`${userProfile.first_name} ${userProfile.last_name}`}</h2>
                    <p className="text-lg">{userProfile.contact_number}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default SellerDetailsModal;
