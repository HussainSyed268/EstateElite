import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Filter = ({onFilteredProperties}) => {
  const [selected, setSelected] = useState('rent');
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const [filtersEnabled, setFiltersEnabled] = useState({
    propertyType: false,
    city: false,
    area: false,
    stories: false,
    startPrice: false,
    endPrice: false
  });
  const [areaType, setAreaType] = useState("Marla");

  const [filterCriteria, setFilterCriteria] = useState({
    propertyType: '',
    city: '',
    area: '',
    stories: '',
  });

  const handleStartRangeChange = (e) => {
    setStartPrice(e.target.value);
  };

  const handleEndRangeChange = (e) => {
    setEndPrice(e.target.value);
  };

  const handleFilterToggle = (filter) => {
    setFiltersEnabled({
      ...filtersEnabled,
      [filter]: !filtersEnabled[filter]
    });
  };

  const handleAreaTypeChange = (e) => {
    setAreaType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilterCriteria({
      ...filterCriteria,
      [id]: value
    });
  };

  const handleSearch = async () => {
    try {
        
        const response = await axios.post('/api/property/filter', {
        city: filtersEnabled.city ? filterCriteria.city : null,
        type: filtersEnabled.propertyType ? filterCriteria.propertyType : null,
        area_type: areaType,
        max_area: filtersEnabled.area ? filterCriteria.area : null,
        storeys: filtersEnabled.stories ? filterCriteria.stories : null,
        start_price: filtersEnabled.startPrice ? startPrice : null,
        end_price: filtersEnabled.endPrice ? endPrice : null,
        listing_reason: selected
        }
    );
      
      // Handle the response data
      console.log(response.data.properties);
      onFilteredProperties(response.data.properties);
    } catch (error) {
      console.error('Failed to fetch properties', error);
      toast.error('Failed to fetch properties');
    }
  };

  return (
    <div className="mx-8 my-4 max-w-screen font-raleway">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="inline-flex items-center p-2 rounded-md cursor-pointer text-gray-800 font-raleway">
          <input
            id="rent"
            type="radio"
            name="toggle"
            className="hidden peer"
            checked={selected === 'rent'}
            onChange={() => setSelected('rent')}
          />
          <label
            htmlFor="rent"
            className={`px-6 py-2 rounded-l-md border cursor-pointer ${selected === 'rent' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            Rent
          </label>

          <input
            id="sale"
            type="radio"
            name="toggle"
            className="hidden peer"
            checked={selected === 'sale'}
            onChange={() => setSelected('sale')}
          />
          <label
            htmlFor="sale"
            className={`px-6 py-2 rounded-r-md border cursor-pointer ${selected === 'sale' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            Sale
          </label>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="propertyType" className="text-stone-500 text-sm font-medium">Type of Property</label>
              <input type="checkbox" checked={filtersEnabled.propertyType} onChange={() => handleFilterToggle('propertyType')} />
            </div>
            <select
              id="propertyType"
              className="mt-2 block w-full rounded-md border bg-white border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              disabled={!filtersEnabled.propertyType}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Land">Land</option>
            </select>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="city" className="text-stone-500 text-sm font-medium">City</label>
              <input type="checkbox" checked={filtersEnabled.city} onChange={() => handleFilterToggle('city')} />
            </div>
            <select
              id="city"
              className="mt-2 block w-full rounded-md border bg-white border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              disabled={!filtersEnabled.city}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Multan">Multan</option>
              <option value="Karachi">Karachi</option>
              <option value="Peshawar">Peshawar</option>
            </select>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="area" className="text-stone-500 text-sm font-medium">Area</label>
              <input
                type="checkbox"
                checked={filtersEnabled.area}
                onChange={() => handleFilterToggle('area')}
                className="checkbox-custom"
              />
            </div>
            <div className="mt-2 flex">
              <input
                type="number"
                id="area"
                placeholder="Enter area"
                className="block w-full rounded-l-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                disabled={!filtersEnabled.area}
                onChange={handleInputChange}
              />
              <select
                value={areaType}
                onChange={handleAreaTypeChange}
                className="block w-1/2 rounded-r-md border bg-white border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                disabled={!filtersEnabled.area}
              >
                <option value="Marla">Marla</option>
                <option value="Canal">Canal</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="stories" className="text-stone-500 text-sm font-medium">Number of Storeys</label>
              <input type="checkbox" checked={filtersEnabled.stories} onChange={() => handleFilterToggle('stories')} />
            </div>
            <select
              id="stories"
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              disabled={!filtersEnabled.stories}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="flex flex-col max-w-md">
            <div className="flex items-center justify-between mb-6">
              <label htmlFor="small-range-start" className="text-stone-500 text-sm font-medium">Starting Price</label>
              <input type="checkbox" checked={filtersEnabled.startPrice} onChange={() => handleFilterToggle('startPrice')} />
            </div>
            <input
              id="small-range-start"
              type="range"
              min="0"
              max="10000000"
              value={startPrice}
              className="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              onChange={handleStartRangeChange}
              style={{
                background: `linear-gradient(to right, black 0%, black ${startPrice / 100000}%, #E5E7EB ${startPrice / 100000}%, #E5E7EB 100%)`,
                outline: 'none',
                WebkitAppearance: 'none',
              }}
              disabled={!filtersEnabled.startPrice}
            />
            <div id="price-display" className="text-lg text-center">
              Rs {startPrice}
            </div>
          </div>

          <div className="flex flex-col max-w-md">
            <div className="flex items-center justify-between mb-6">
              <label htmlFor="small-range-end" className="text-stone-500 text-sm font-medium">Ending Price</label>
              <input type="checkbox" checked={filtersEnabled.endPrice} onChange={() => handleFilterToggle('endPrice')} />
            </div>
            <input
              id="small-range-end"
              type="range"
              min="0"
              max="10000000"
              value={endPrice}
              className="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              onChange={handleEndRangeChange}
              style={{
                background: `linear-gradient(to right, black 0%, black ${endPrice / 100000}%, #E5E7EB ${endPrice / 100000}%, #E5E7EB 100%)`,
                outline: 'none',
                WebkitAppearance: 'none',
              }}
              disabled={!filtersEnabled.endPrice}
            />
            <div id="price-display" className="text-lg text-center">
              Rs {endPrice}
            </div>
          </div>

          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              width: 16px;
              height: 16px;
              background: black;
              border-radius: 50%;
              cursor: pointer;
              -webkit-appearance: none;
            }
            input[type='range']::-moz-range-thumb {
              width: 16px;
              height: 16px;
              background: black;
              border-radius: 50%;
              cursor: pointer;
            }
          `}</style>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex font">
          <button
            className="active:scale-95 rounded-lg px-8 hover:text-white hover:bg-black transition-all py-2 font-medium text-black outline-none focus:ring hover:opacity-90"
            onClick={() => {
              setSelected('rent');
              setStartPrice(0);
              setEndPrice(0);
              setFiltersEnabled({
                propertyType: false,
                city: false,
                area: false,
                stories: false,
                startPrice: false,
                endPrice: false
              });
              setFilterCriteria({
                propertyType: '',
                city: '',
                area: '',
                stories: ''
              });
            }}
          >
            Reset
          </button>
          <button
            className="active:scale-95 rounded-lg bg-[#F9A826] hover:text-white hover:bg-black transition-all text-black px-8 py-2 font-medium outline-none focus:ring hover:opacity-90"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
