import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const PhotoUploder = ({ addedPhotos, onChange }) => {
  // setting the states

  const [addUsigLink, setaddUsigLink] = useState("");

  // Adding Photo By Link
  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: addUsigLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setaddUsigLink("");
  };

  // Adding Photo from device
  const uploadPhoto = (ev) => {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  const removePhoto = (ev, filename) => {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const addAsMainPhoto = (ev, filename) => {
    ev.preventDefault();
    onChange([filename, ...addedPhotos.filter((name) => name !== filename)]);
  };

  return (
    <>
      <h2 className="text-xl mt-4">Photos</h2>
      <p className="text-gray-400  text-sm ">more=better</p>

      <div className="flex gap-1 ">
        <input
          type="text"
          value={addUsigLink}
          onChange={(ev) => setaddUsigLink(ev.target.value)}
          placeholder="Upload using the link..jpg"
        />
        <button
          onClick={addPhotoByLink}
          className="px-2 bg-gray-300 rounded-2xl ">
          Add&nbsp;Photo
        </button>
      </div>
      <div className=" mt-2 gap-2 grid grid-cols-3 md:grid-cols-3 md:grid-cols-6 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            // eslint-disable-next-line react/jsx-key
            <div className="h-32 flex relative" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={`http://localhost:4000/uploads/${link}`}
                alt=""
              />
              <button
                className="absolute bottom-1 right-1 text-white bg-black p-2 rounded-2xl opacity-50"
                onClick={(ev) => removePhoto(ev, link)}>
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button
                className="absolute bottom-1 left-1 text-white bg-black p-2 rounded-2xl opacity-50"
                onClick={(ev) => addAsMainPhoto(ev, link)}>
                {link === addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
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
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="flex items-center cursor-pointer gap-1 bg-transparent border rounded-2xl p-4 text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};
export default PhotoUploder;
