import { useEffect, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import {Link} from "react-router-dom"
import axios from "axios";
import AccountPageComponents from "../subcomponents/AccountPageComponents";
import PlaceImg from "../subcomponents/PlaceImg";
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  console.log(bookings);
  return (
    <div>
      <AccountPageComponents />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link to={`/account/bookings/${booking._id}`} className="mt-4 flex bg-gray-100 rounded-xl p-4">
              <div key={booking.id} className="flex gap-4">
                <div className="w-40 h-40 cursor-pointer bg-gray-300  shrink-0 rounded-2xl overflow-hidden">
                  <PlaceImg place={booking.place} />
                </div>
                <div className="ml-2 grow">
                  <h2 className="text-xl font-semibold">
                    {booking.place.title}
                  </h2>

                  <div className="mt-2 flex gap-4  border-t border-gray-300">
                    <div className="flex mt-2">
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      {format(new Date(booking.checkInDate), "yyyy-MM-dd")}
                    </div>
                        <span className="font-bold mt-2 text-xl">  &rarr; </span>
                    <div className="flex mt-2 ">
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>{" "}
                      {format(new Date(booking.checkInDate), "yyyy-MM-dd")}
                    </div>
                   
                  </div>
                  <div className="mt-3 flex gap-2 font-semibold">
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
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      />
                    </svg>
                    <span className="gap-1"> Nights:</span> 
                    {differenceInCalendarDays(
                      booking.checkOutDate,
                      booking.checkInDate
                    )}
                  </div>

                  <div className="mt-8 text-lg font-bold">
                    <h2> Total Price: ${booking.price}</h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default BookingsPage;
