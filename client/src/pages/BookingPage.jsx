import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationPageGallery from "../subcomponents/LocationPageGallery";


const BookingPage = () => {
  const { id } = useParams();

  const [booking, setBookings] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBookings(foundBooking);
        }
      });
    }
  }, [id]);

  if(!booking){
    return'';
  }
  return (
    <div>
      <div className="mt-4">
      <LocationPageGallery place={booking.place}/>
      </div>
    </div>
  );
};
export default BookingPage;
