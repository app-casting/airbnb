import { useEffect, useState } from "react";

import axios from "axios";

import PhotoUploder from "../subcomponents/PhotoUploads";
import Perks from "../subcomponents/Perks";
import AccountPageComponents from "../subcomponents/AccountPageComponents";
import { Navigate, useParams } from "react-router-dom";

const AddPlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [discription, setDiscription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [guest, setGuest] = useState("1");
  const [redirect, setRedirect] = useState();
  const [price, setPrice] = useState("");

  const savePlace = async (ev) => {
    ev.preventDefault();

    const formData = {
      title,
      address,
      addedPhotos,
      discription,
      extraInfo,
      perks,
      checkInTime,
      checkOutTime,
      guest,
      price
    };

    if (id) {
      await axios.put("/places", { id, ...formData });
      setRedirect(true);
    } else {
      await axios.post("/places", formData);
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;

      setTitle(data.title),
        setAddress(data.address),
        setAddedPhotos(data.addedPhotos),
        setDiscription(data.discription),
        setExtraInfo(data.extraInfo),
        setPerks(data.perks),
        setCheckInTime(data.checkInTime),
        setCheckOutTime(data.checkOutTime),
        setGuest(data.guest);
        setPrice(data.price)
    });
  }, [id]);

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountPageComponents />
      <form onSubmit={savePlace}>
        <h2 className="text-xl mt-4">Title</h2>
        <p className="text-gray-400 text-sm">
          Add a short title for you your place as mentioned in Addvertisement
        </p>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className=""
          placeholder="Add your title here"
        />
        <h2 className="text-xl mt-4">Address</h2>
        <p className="text-gray-400  text-sm">Please mention the address</p>
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          className=""
          placeholder="address"
        />
        <PhotoUploder addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <h2 className="text-xl mt-4">Description</h2>
        <p className="text-gray-400  text-sm">Add a discription of the place</p>
        <textarea
          value={discription}
          onChange={(ev) => setDiscription(ev.target.value)}>
          {" "}
          This is a textarea
        </textarea>
        <h2 className="text-xl mt-4">Perks</h2>
        <p className="text-gray-400  text-sm">
          Select all the perks of your place
        </p>
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <h2 className="text-xl mt-4">Extra Info</h2>
        <p className="text-gray-400  text-sm">House Rules etc..</p>
        <textarea
          value={extraInfo}
          onChange={(ev) => {
            setExtraInfo(ev.target.value);
          }}
        />
        <h2 className="text-xl mt-4">Check In & Out Time</h2>
        <p className="text-gray-400  text-sm">
          Remember to have some time window for cleaning of the room
        </p>
        <div className="grid gap-2 sm: grid-cols-3 grid-cols-4">
          <div>
            <h4 className="mt-2 mb-1">Check In Time</h4>
            <input
              type="text"
              value={checkInTime}
              onChange={(ev) => setCheckInTime(ev.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h4 className="mt-2 mb-1">Check Out Time</h4>
            <input
              type="text"
              value={checkOutTime}
              onChange={(ev) => setCheckOutTime(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h4 className="mt-2 mb-1 ">No of Guest</h4>
            <input
              type="number"
              value={guest}
              onChange={(ev) => setGuest(ev.target.value)}
            />
          </div>
          <div>
            <h4 className="mt-2 mb-1 ">Charges Per Night</h4>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4"> Save Entry</button>
      </form>
    </div>
  );
};
export default AddPlacesFormPage;
