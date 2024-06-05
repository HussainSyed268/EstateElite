// components/FileUpload.tsx
import React, { useState } from "react";
import { RiUploadCloudLine } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import classNames from "classnames";

const FileUpload = ({ setPictures }) => {
    const [tempFiles, setTempFiles] = useState([]); // Temporary files holder
    const [shouldHighlight, setShouldHighlight] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const preventDefaultHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        preventDefaultHandler(e);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            
            newFiles.forEach(file => {
                const newImage = new Image();
                newImage.src = URL.createObjectURL(file);
                newImage.onload = function () {
                    const width = newImage.width;
                    const height = newImage.height;               
                    const ratio = width / height;
                  


                    if (ratio === 2) {
                        setTempFiles(prevFiles => {
                            const updatedFiles = [...prevFiles, file];
                            setPictures(updatedFiles);
                            return updatedFiles;
                        });
                    } else {
                        toast.error("Image ratio must be 2:1", {
                            position: "bottom-right",
                        });
                    }
                };
            });
        }
        setShouldHighlight(false);
    };

    const removeFile = (file) => {
        setTempFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((f) => f !== file);
            setPictures(updatedFiles);

            // Adjust currentIndex if it goes out of bounds
            if (updatedFiles.length <= currentIndex) {
                setCurrentIndex(Math.max(0, updatedFiles.length - 3));
            }
            
            return updatedFiles;
        });
    };

    const goToPreviousImage = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const goToNextImage = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, tempFiles.length - 3));
    };

    return (
        <div className="w-full mt-12 flex flex-col items-center">
            <div
                className={classNames({
                    "w-[70%] h-[20rem]": true,
                    "max-[650px]:w-full": true, 
                    "p-4 grid place-content-center cursor-pointer": true,
                    "text-black rounded-lg": true,
                    "border-4 border-dashed ": true,
                    "transition-colors": true,
                    "border-black bg-[#a3a3a3]": shouldHighlight,
                    "border-black bg-[#e5e5e6]": !shouldHighlight,
                })}
                onDragOver={preventDefaultHandler}
                onDragEnter={(e) => {
                    preventDefaultHandler(e);
                    setShouldHighlight(true);
                }}
                onDragLeave={(e) => {
                    preventDefaultHandler(e);
                    setShouldHighlight(false);
                }}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center">
                    <>
                        <RiUploadCloudLine className="w-10 h-10 text-black" />
                        <span className="text-black font-raleway font-bold">
                            Drag and drop images here
                        </span>
                    </>
                </div>
            </div>
            {/* {tempFiles.length > 0 && ( */}
                <div className="relative w-[70%] h-44 mt-4">
                    {currentIndex > 0 && (
                        <button
                            onClick={goToPreviousImage}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl text-black bg-white bg-opacity-75 p-1 rounded-full"
                        >
                            <FaChevronLeft />
                        </button>
                    )}
                    <div className="flex justify-center overflow-hidden">
                        <div className="flex">
                            {tempFiles.slice(currentIndex, currentIndex + 3).map((file, index) => (
                                <div key={index} className="relative m-2">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`File ${currentIndex + index + 1}`}
                                        className="w-[10rem] h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        className="absolute top-2 right-2 text-red-500 bg-white bg-opacity-75 p-1 rounded-full"
                                        onClick={() => removeFile(file)}
                                    >
                                        &times;
                                    </button>
                                    <p className="text-center mt-2">{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {currentIndex + 3 < tempFiles.length && (
                        <button
                            onClick={goToNextImage}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-black bg-white bg-opacity-75 p-1 rounded-full"
                        >
                            <FaChevronRight />
                        </button>
                    )}
                </div>
            {/* )} */}
        </div>
    );
};

export default FileUpload;
