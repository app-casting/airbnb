import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate} from "react-router-dom";

/* eslint-disable react/prop-types */
const BookingWidget = ({ place }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guest, setGuest] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [mobile, setMobile] = useState(1);
  const [redirect, setRedirect] = useState(null)
  const navigate= useNavigate()

  let numberOfNights = 0;

  if (checkInDate && checkOutDate) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOutDate),
      new Date(checkInDate)
    );
  }
  const bookPlace = async () => {
    const response = await axios.post("/bookings", {
        checkInDate,
        checkOutDate,
        guest,
        guestName,
        mobile,
        place: place._id,
        price: numberOfNights * place.price,
      });
      const BookingId = response.data._id
      setRedirect(`/account/bookings/${BookingId}`)
  };

  if(redirect){
    navigate(redirect)
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl mt-4 ">
      <div className="text-2xl font-semibold text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label className="font-semibold">Check In:</label>
            <br />
            <input
              type="date"
              value={checkInDate}
              onChange={(ev) => setCheckInDate(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label className="font-semibold">Check Out:</label>
            <br />
            <input
              type="date"
              value={checkOutDate}
              onChange={(ev) => setCheckOutDate(ev.target.value)}
            />
          </div>
        </div>
        <div className="px-3 py-3 border-t">
          <label className="font-semibold">Number Of Guest:</label>
          <input
            type="number"
            value={guest}
            onChange={(ev) => setGuest(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="px-3 py-3 border-t">
            <label>Enter Your Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(ev) => setGuestName(ev.target.value)}
            />
            <label>Enter Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(ev) => setMobile(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookPlace} className="primary mt-3">
        Book this Place
        {numberOfNights > 0 && (
          <span className="font-bold"> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
};
export default BookingWidget;
