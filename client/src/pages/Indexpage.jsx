import { useEffect,useState } from "react"
import {Link} from 'react-router-dom'
import axios from "axios"

const Indexpage = () => {

  const [places, setPlaces] = useState([])

  useEffect(()=>{
    axios.get('/places').then(response =>{
      setPlaces(response.data)
    })  
  },[])
  return (
    <div className="sm: grid grid-cols-2 md:grid grid-cols-3 lg:grid grid-cols-3 gap-auto">
      {places.length > 0 && places.map(place =>(
        <Link to={"/places/"+place._id} key={place.id} >
          <div className="w-80 h-100 mt-8 mx-auto" >
          <img className="rounded-2xl aspect-square object-cover" src={"http://localhost:4000/uploads/"+place.addedPhotos[0]} alt="img" />
          <div className="mt-2">
          <h2 className="font-bold">{place.address}</h2>
          <h2 className="font-normal text-gray-500">{place.title}</h2>
          <h2 className="font-normal mt-1"><span className="font-bold">${place.price} </span>per Night</h2>
          </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Indexpage
