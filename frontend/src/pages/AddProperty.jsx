import React,{useState, useContext} from "react";
import { IoHomeOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { IoIosBed } from "react-icons/io";
import { MdBathtub } from "react-icons/md";
import { GiStairs } from "react-icons/gi";
import DragDrop from "../components/DragDrop";
import DragDrop360 from "../components/DragDrop360";
import { AuthContext } from '../context/AuthContext';

const AddProperty = () => {

    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [storeys, setStoreys] = useState(1);
    const [pictures, setPictures] = useState([]);
    const [pic360, setPic360] = useState([]);
    const [propertyType, setPropertyType] = useState("");
    const [areaType, setAreaType] = useState("Marla");
    const [area, setArea] = useState(0);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [listingReason, setListingReason] = useState("");
    const [parkingSpace, setParkingSpace] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const { auth } = useContext(AuthContext);
  

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handlePicturesUpload = async (files) => {
        const base64Files = await Promise.all(Array.from(files).map(file => convertToBase64(file)));
        setPictures(base64Files);
    };
    
    const handle360PicturesUpload = async (files) => {
        const base64Files = await Promise.all(Array.from(files).map(file => convertToBase64(file)));
        setPic360(base64Files);
    };
    
      const handleSubmit = async () => {
        const images = [
          ...pictures.map((file) => ({ image: file, is360: false })),
          ...pic360.map((file) => ({ image: file, is360: true })),
        ];
    
        const propertyData = {
          seller_id: auth.user.id,
          name,
          description,
          price,
          address,
          city,
          country,
          storeys,
          bedrooms,
          bathrooms,
          parking_space: parkingSpace,
          area,
          area_unit: areaType,
          status: "pending",
          listing_reason: listingReason,
          type: propertyType,
          rating: 0,
          images,
        };
    
        try {
          const response = await fetch("http://localhost:5000/api/property/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(propertyData),
          });
    
          if (!response.ok) {
            throw new Error("Failed to add property");
          }
    
          const result = await response.json();
          alert(result.message);
        } catch (error) {
          console.error(error);
          alert("An error occurred while adding the property");
        }
      };

      const handleReset = () => {
        setBedrooms(1);
        setBathrooms(1);
        setStoreys(1);
        setPictures([]);
        setPic360([]);
        setPropertyType("");
        setAreaType("Marla");
        setArea(0);
        setName("");
        setAddress("");
        setCity("");
        setCountry("");
        setListingReason("");
        setParkingSpace("");
        setDescription("");
        setPrice("");
      };
    
    

    

    return(

        <>
            <div className="text-lg breadcrumbs mx-8">
                <ul>
                    <li><a href="/" className="text-[#242424] hover:text-[#F9A826] transition-all">Home</a></li>
                    <li><a href="/add-property" className="text-[#242424] hover:text-[#F9A826] transition-all">Add Property</a></li>
                </ul>
            </div>
            
            <div className="mx-8 font-raleway max-[1036px]:text-[3rem] text-[4rem] font-bold  mt-4 max-[706px]:text-[3rem] max-[706px]:text-center max-[546px]:text-[2rem]">
                List your Property on <span className="text-[#F9A826] font-philosopher">BricksReal</span>
            </div>
            <div className="mx-8 min-[1450px]:flex">
            <div className="font-raleway min-[1450px]:w-1/2">
            <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
                Property Type
            </h1>
            <div className="max-[1550px]:h-[8rem] max-[650px]:flex max-[650px]:flex-wrap max-[650px]:gap-4 max-[625px]:h-[14rem] h-[9rem] min-[650px]:w-[45rem] min-[1450px]:w-[55rem] grid grid-cols-5 ">
                <div 
                    onClick={() => setPropertyType("house")} 
                    className={`min-[650px]:col-span-1 max-[1550px]:w-[8rem] w-[9rem] border-2 ${propertyType === "house" ? 'border-black text-black' : 'border-gray-300 text-gray-400'} rounded-xl flex flex-col justify-center items-center cursor-pointer`}>
                    <IoHomeOutline className="max-[625px]:w-8 max-[625px]:h-8 w-10 mb-4 h-10" />
                    <p>House</p>
                </div>
                <div 
                    onClick={() => setPropertyType("apartment")} 
                    className={`min-[650px]:col-span-1 max-[1550px]:w-[8rem] w-[9rem] border-2 ${propertyType === "apartment" ? 'border-black text-black' : 'border-gray-300 text-gray-400'} rounded-xl flex flex-col justify-center items-center cursor-pointer`}>
                    <BsBuildings className="max-[625px]:w-8 max-[625px]:h-8 w-10 mb-4 h-10" />
                    <p>Apartment</p>
                </div>
                <div 
                    onClick={() => setPropertyType("villa")} 
                    className={`min-[650px]:col-span-1 max-[1550px]:w-[8rem] w-[9rem] border-2 ${propertyType === "villa" ? 'border-black text-black' : 'border-gray-300 text-gray-400'} rounded-xl flex flex-col justify-center items-center cursor-pointer`}>
                    <MdOutlineVilla className="max-[625px]:w-8 max-[625px]:h-8 w-10 mb-4 h-10" />
                    <p>Villa</p>
                </div>
                <div 
                    onClick={() => setPropertyType("land")} 
                    className={`min-[650px]:col-span-1 max-[1550px]:w-[8rem] w-[9rem] border-2 ${propertyType === "land" ? 'border-black text-black' : 'border-gray-300 text-gray-400'} rounded-xl flex flex-col justify-center items-center cursor-pointer`}>
                    <GrMapLocation className="max-[625px]:w-8 max-[625px]:h-8 w-10 mb-4 h-10" />
                    <p>Land</p>
                </div>
            </div>
            <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
                Property Name
            </h1>
            <input value={name} type="text" onChange={(e)=>{setName(e.target.value)} } placeholder="Enter property name" className="max-[750px]:w-full w-[80%] border-2 border-gray-300 rounded-xl p-2 outline-black focus:outline" />
            <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
                Property Address
            </h1>
            <input type="text" 
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}
              placeholder="Enter property address" className="max-[750px]:w-full w-[80%] border-2 border-gray-300 rounded-xl p-2 outline-black focus:outline" />
            <div className="flex">
                <select
                    value={city}
                    id="city"
                    className="mt-4 block w-[15rem] mr-4 rounded-md border bg-white border-gray-300 px-2 py-2 shadow-sm outline-none focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    onChange={(e)=>{setCity(e.target.value)}}
                >
                 <option className="hidden" value="" selected>Select City</option>
                    <option value = "lahore">Lahore</option>
                    <option value = "islamabad">Islamabad</option>
                    <option value = "multan">Multan</option>
                    <option value = "karachi">Karachi</option>
                    <option value = "peshawar">Peshawar</option>

                </select>
                <select
                    id="country"
                    className="mt-4 block w-[15rem] bg-white rounded-md border border-gray-300 px-2 py-2 shadow-sm outline-none focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    onChange={(e)=>{setCountry(e.target.value)}}
                >
                <option className="hidden" value="" selected>Select Country</option>
                    <option value="pakistan">Pakistan</option>


                </select>
            </div>
            <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Number of Storeys
            </h1>
            <div className="max-[750px]:flex-wrap inline-flex items-center p-2 gap-6 rounded-md cursor-pointer text-gray-800 font-raleway">
            <input
                
                id="1storey"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={storeys === 1}
                onChange={() => setStoreys(1)}
            />
            <label
                htmlFor="1storey"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${storeys === 1 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                1
                <GiStairs className="ml-4"/>
            </label>

            <input
                id="2storey"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={storeys === 2}
                onChange={() =>setStoreys(2)}
            />
            <label
                htmlFor="2storey"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${storeys === 2 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                2
                <GiStairs className="ml-4"/>
            </label>

            <input
                id="3storey"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={storeys === 3}
                onChange={() => setStoreys(3)}
            />
            <label
                htmlFor="3storey"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${storeys === 3 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                3+
                <GiStairs className="ml-4"/>
            </label>

        </div>
            <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Number of Bedrooms
            </h1>
            <div className="max-[750px]:flex-wrap inline-flex items-center p-2 gap-6 rounded-md cursor-pointer text-gray-800 font-raleway">
            <input
                id="1bed"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bedrooms === 1}
                onChange={() => setBedrooms(1)}
            />
            <label
                htmlFor="1bed"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bedrooms === 1 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                1
                <IoIosBed className="ml-4"/>
            </label>

            <input
                id="2bed"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bedrooms === 2}
                onChange={() =>setBedrooms(2)}
            />
            <label
                htmlFor="2bed"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bedrooms === 2 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                2
                <IoIosBed className="ml-4"/>
            </label>

            <input
                id="3bed"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bedrooms === 3}
                onChange={() => setBedrooms(3)}
            />
            <label
                htmlFor="3bed"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bedrooms === 3 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                3
                <IoIosBed className="ml-4"/>
            </label>

            <input
                id="4bed"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bedrooms === 4}
                onChange={() => setBedrooms(4)}
            />
            <label
                htmlFor="4bed"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bedrooms === 4 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
            4
            <IoIosBed className="ml-4"/>
            </label>

            <input
                id="5bed"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bedrooms === 5}
                onChange={() => setBedrooms(5)}
            />
            <label
                htmlFor="5bed"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bedrooms === 5 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                5
                <IoIosBed className="ml-4"/>
            </label>

            <input
                id="6bed"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bedrooms === 6}
                onChange={() => setBedrooms(6)}
            />
            <label
                htmlFor="6bed"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bedrooms === 6 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                6+ 
                <IoIosBed className="ml-4"/>
            </label>


        </div>
        <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Number of Bathrooms
            </h1>
            <div className=" max-[750px]:flex-wrap inline-flex items-center p-2 gap-6 rounded-md cursor-pointer text-gray-800 font-raleway">
            <input
                id="1bath"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bathrooms === 1}
                onChange={() => setBathrooms(1)}
            />
            <label
                htmlFor="1bath"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bathrooms === 1 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                1
                <MdBathtub className="ml-4"/>
            </label>

            <input
                id="2bath"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bathrooms === 2}
                onChange={() =>setBathrooms(2)}
            />
            <label
                htmlFor="2bath"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bathrooms === 2 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                2
                <MdBathtub className="ml-4"/>
            </label>

            <input
                id="3bath"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bathrooms === 3}
                onChange={() => setBathrooms(3)}
            />
            <label
                htmlFor="3bath"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bathrooms === 3 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                3
                <MdBathtub className="ml-4"/>
            </label>

            <input
                id="4bath"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bathrooms === 4}
                onChange={() => setBathrooms(4)}
            />
            <label
                htmlFor="4bath"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bathrooms === 4 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
            4
            <MdBathtub className="ml-4"/>
            </label>

            <input
                id="5bath"
                type="radio"
                name="toggle"
                className="hidden peer"
                checked={bathrooms === 5}
                onChange={() => setBathrooms(5)}
            />
            <label
                htmlFor="5bath"
                className={`px-6 py-2  border rounded-full flex justify-center items-center cursor-pointer ${bathrooms === 5 ? 'bg-black text-white border-none' : 'bg-white text-black'}`}
            >
                5+
                <MdBathtub className="ml-4"/>
            </label>

        </div>
        <div className="flex flex-wrap">
        <div>
        <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Reason of Listing
            </h1>
            <select
                    value={listingReason}
                    id="city"
                    className="mt-2 block h-[3rem] w-[15rem] mr-4 rounded-md border bg-white border-gray-300 px-2 py-2 shadow-sm outline-none focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    onChange={(e)=>{setListingReason(e.target.value)}}
                >
                 <option className="hidden" value="" selected>Select Reason</option>
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>

                </select>
                </div>
                <div>
                <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
                Area of Property
            </h1>
            <div className="flex">
                    <input

                        type="number"
                        id="area"
                        placeholder="Enter area"
                        onChange={(e) => setArea(e.target.value)}
                        value={area}
                        className="block w-full rounded-l-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                       
                    />
                    <select
                        value={areaType}
                        onChange={(e) => setAreaType(e.target.value)}
                        className="block w-1/2 rounded-r-md border bg-white border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    >
                        <option value="marla">Marla</option>
                        <option value="canal">Canal</option>
                    </select>
                </div>
                
        </div>
        </div>
        <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Parking Space
            </h1>
            <select
            value={parkingSpace}
                    id="city"
                    className="mt-2 block h-[3rem] w-[15rem] mr-4 rounded-md border bg-white border-gray-300 px-2 py-2 shadow-sm outline-none focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    onChange={(e)=>{if (e.target.value === "true") {
                        setParkingSpace(true)
                    }
                    else{
                        setParkingSpace(false)
                    }
                    }}
                >
                 <option className="hidden" value="" selected>Select Option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>

                </select>
        <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Property Description
            </h1>          
            <textarea
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            placeholder="Enter property description" className="max-[750px]:w-full w-[80%] min-h-[10rem] resize-none border-2 border-gray-300 rounded-xl p-2 outline-black focus:outline" />
        <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Quoted Price in PKR
            </h1> 
            <div className="flex justify-between items-center w-[20.5rem]">
            <input 
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
             type="text" placeholder="Enter quoted price" className="w-[15rem] border-2 border-gray-300 rounded-xl p-2 outline-black focus:outline" />
              {listingReason === "rent" && (
        <h1 className="text-[1.2rem]">
            / Month
        </h1>
    )}
            </div>
            </div>
            <div className="min-[1450px]:w-1/2">
            <div className=" font-raleway max-[1000px]:flex-col max-[1449px]:flex">
            <div className="max-[1000px]:w-full max-[1449px]:w-1/2">
            <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Upload Property Pictures
            </h1> 
            <DragDrop setPictures={handlePicturesUpload} />
            </div>
            <div className="max-[1000px]:w-full max-[1449px]:w-1/2">
            <h1 className="text-[1.2rem] font-bold mt-8 mb-2">
            Upload 360° Property Pictures
            </h1> 
            <DragDrop360 setPictures={handle360PicturesUpload} />
</div>

        </div>
            </div>
            </div>
        
        <div className="w-full flex justify-end my-16">
        <button 
        onClick={handleReset}
        class="active:scale-95 rounded-lg  px-8   hover:text-white hover:bg-black border-black border-2 transition-all py-2 font-medium text-black outline-none focus:ring hover:opacity-90">Reset</button>
        <button
        onClick={handleSubmit}
         class="active:scale-95 rounded-lg bg-black mr-24 ml-8 hover:text-white hover:bg-black transition-all text-white px-8 py-2 font-medium outline-none focus:ring hover:opacity-90">List Property</button>
        </div>
        </>

    )
}

export default AddProperty;