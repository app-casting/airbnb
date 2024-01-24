import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./userContext"
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
    const {user}=useContext(UserContext)
    return (
      
    <header className="flex  justify-between">
    <div className="flex">
      <Link to={"/"} className="bg-primary text-white p-1 rounded-full">
      <IoHomeOutline style={{ width: "40px", height: "40px" }}/>
      </Link>
      <span className="font-bold mt-3 ml-2 text-xl">
        Airbnb
      </span>
    </div>

    <div className="flex items-center rounded-full border  border-shadow pl-2 pr-2 shadow-md shadow-gray-300 gap-1 hover:shadow-lg transition duration-300 ease-in-out h-10">
      <div className="p-2">Anywhere</div>
      <div className="border-l border-gray-300 h-6"></div>
      <div className="p-2">Any week</div>
      <div className="border-l border-gray-300 h-6"></div>
      <div className="p-2">Add Guests</div>
      
      <button className=" inset-0 flex items-center justify-center bg-primary rounded-full p-2" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="white"
          data-slot="icon"
          className="w-4 h-4 stroke-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
    <div className="flex">
      <div className="flex mr-1 items-center ">
        {/* <div className=" hover:bg-gray-100 rounded-full p-2 m-2">
        <a href="" className="p-2">
        Airbnb Your Home
        </a>
        </div> */}

        <div className=" hover:bg-gray-100 rounded-full p-2">
        <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          data-slot="icon"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        </button>
        </div>
        </div>
        <Link to={ user?"/account":"/login"} className="flex items-center rounded-full border  border-shadow pl-2 pr-2 shadow-md shadow-gray-300 hover:shadow-xl transition duration-300 ease-in-out h-10">
        <button className="flex ml-2 mr-2 items-center h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            data-slot="icon"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            data-slot="icon"
            className="w-6 h-6 ml-4 ">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        {!!user &&(
      <div className="p-1">{user.name}</div>
    )}
      </Link>
    </div>
  </header>
)}

export default Header

