import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Loginpage";
import Layout from "./Layout";
import Indexpage from "./pages/Indexpage";
import Register from "./pages/RegisterPage";
import { UserContextProvider } from "./userContext";
import ProfilePage from "./pages/ProfilePage";

import axios from "axios";
import AddPlacesFormPage from "./pages/AddPlaceFormPage"
import PlacesPage from "./pages/PlacesPage";
import LocationPage from "./pages/LocationPage";
import BookingsPage from "./pages/BookingsPage"
import BookingPage from "./pages/BookingPage"

axios.defaults.baseURL = "http://localhost:4000";

axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Indexpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path= "/account" element={<ProfilePage/>}/>
            <Route path= "/account/places" element={<PlacesPage/>}/>
            <Route path= "/account/places/new" element={<AddPlacesFormPage/>}/>
            <Route path= "/account/places/:id" element={<AddPlacesFormPage/>}/>
            <Route path= "/places/:id" element={< LocationPage/>}/>
            <Route path= "/account/bookings" element={< BookingsPage/>}/>
            <Route path= "/account/bookings/:id" element={< BookingPage/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
