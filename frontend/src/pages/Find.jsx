import React from "react"
import Filter from "../components/Filter.jsx"

const Find = () => {
    return (
        <>
        <div className="text-lg breadcrumbs mx-8">
            <ul>
                <li><a href="/" className="text-[#242424] hover:text-[#F9A826] transition-all">Home</a></li> 
                <li><a href="/" className="text-[#242424] hover:text-[#F9A826] transition-all">Find Property</a></li>
            </ul>
        </div>
        <div className="font-raleway text-[4rem] font-bold mx-8 mt-4 max-[706px]:text-[3rem] max-[706px]:text-center max-[546px]:text-[2rem]">
            Find your next <span className="text-[#F9A826] font-philosopher">Home</span>
        </div>
            <Filter/>
        </>
    )
}

export default Find