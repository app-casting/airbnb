
import {useState} from 'react'

const LocationPageGallery = ({place})=>{

    const [showAllPhotos, setshowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
          <div className="absolute inset-0 bg-black text-white min-h-screen">
            <div className="p-8 bg-black grid gap-4">
              <div>
                <h2 className="text-3xl mr-36">Photos of {place.title}</h2>
                <button
                  onClick={() => setshowAllPhotos(false)}
                  className="flex right-12 top-8 fixed shadow shadow-black-300 gap-1 py-2 px-4 rounded-2xl bg-gray-300 text-black">
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
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>{" "}
                  Close Photos
                </button>
              </div>
              {place?.addedPhotos?.length > 0 &&
                place.addedPhotos.map((photo) => (
                  <div key={photo.id}>
                    <img src={"http://localhost:4000/uploads/" + photo} alt="" />
                  </div>
                ))}
            </div>
          </div>
        );
      }

    return(
<div>
        
        <h1 className="text-3xl mb-2">{place.title}</h1>
        <a
          rel="noreferrer"
          target={"_blank"}
          href={"https://maps.google.com/?q=" + place.address}>
          <h2 className="font-semibold underline flex mb-3 gap-1">
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            {place.address}{" "}
          </h2>
        </a>
        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
              {place.addedPhotos?.[0] && (
                <div>
                  <img
                    className="aspect-square object-cover "
                    src={`http://localhost:4000/uploads/${place.addedPhotos[0]}`}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="grid">
              {place.addedPhotos?.[1] && (
                <img
                  className="aspect-square object-cover"
                  src={`http://localhost:4000/uploads/${place.addedPhotos[1]}`}
                  alt=""
                />
              )}
              <div className="overflow-hidden">
                {place.addedPhotos?.[2] && (
                  <img
                    className="aspect-square object-cover relative top-2"
                    src={`http://localhost:4000/uploads/${place.addedPhotos[2]}`}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
  
          <button
            onClick={() => setshowAllPhotos(true)}
            className="absolute flex gap-2 bottom-2 right-2 py-2 px-2 bg-white rounded-2xl shadow-md shadow-gray-500 ">
            {" "}
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
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            Show More
          </button>
        </div>
        </div>
    )
}
export default LocationPageGallery