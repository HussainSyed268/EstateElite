import React,{useState} from "react";

const Property = () => {

    const [isSaved, setIsSaved] = useState(false);

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    
    return (
<>
        <div className="text-lg breadcrumbs mx-8 mb-8">
        <ul>
            <li><a href="/" className="text-[#242424] hover:text-[#F9A826] transition-all">Home</a></li>
            <li><a href="/find" className="text-[#242424] hover:text-[#F9A826] transition-all">Find Property</a></li>
        </ul>
    </div>
    <div className="mx-8 py-8 px-8 bg-slate-200 rounded-xl h-[35rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-evenly">
        <div className="bg-green-500 col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 rounded-lg h-full">1</div>
        <div className="bg-green-500 rounded-lg h-full">2</div>
        <div className="bg-green-500 rounded-lg h-full">3</div>
        <div className="bg-green-500 rounded-lg h-full">4</div>
        <div className="bg-green-500 rounded-lg h-full">5</div>
    </div>

    <div className="flex items-center justify-between font-raleway text-[4rem] font-bold mx-10 mt-4 max-[706px]:text-[3rem] max-[546px]:text-[2rem]">
        <h1>
            Property Page
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
        House no. 236, Block D - Lahore
    </h>
    
</div>

    <div className="grid grid-cols-6 rounded-xl bg-slate-300 mt-12 mx-12 h-[9rem]">
        <div className="col-span-1 bg-green-500 h-full rounded-l-xl">1</div>
        <div className="col-span-1 bg-green-500 h-full">2</div>
        <div className="col-span-1 bg-green-500 h-full">3</div>
        <div className="col-span-1 bg-green-500 h-full">4</div>
        <div className="col-span-1 bg-green-500 h-full">5</div>
        <div className="col-span-1 bg-green-500 h-full rounded-r-xl">6</div>

    </div>
        </>
    );
}

export default Property;