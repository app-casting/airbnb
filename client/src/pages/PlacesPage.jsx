import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountPageComponents from "../subcomponents/AccountPageComponents";
import PlaceImg from "../subcomponents/PlaceImg"

const PlacesPage =  () => {
  const [places, setPlaces] = useState([]);

  console.log("check 1")
  useEffect (  () => {
    const fetchData = async()=>{
    try {
      const {data} = await axios.get("/user-places");
      setPlaces(data);
      
    } catch (error) {
      console.log("Error fetching the data:" , error)
    }
  }
  fetchData()
  }, []);
  return (
    <div>
      <AccountPageComponents />
      <div className="text-center">
        <Link
          className="bg-primary text-white py-2 px-6 rounded-full  inline-flex gap-1"
          to={"/account/places/new"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add a new place
        </Link>
      </div>

      {places.length > 0 &&
        places.map((place) => (
          <div key={place.id} className="mt-4 flex bg-gray-100 rounded-xl p-4">
            <Link
              to={"/account/places/" + place._id}
              className="w-32 cursor-pointer h-32 bg-gray-300  shrink-0 rounded-full overflow-hidden">
                
            <PlaceImg place={place}/>
            </Link>
            <div className="pl-2 ml-4" key={place.id}>
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.discription}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlacesPage;
