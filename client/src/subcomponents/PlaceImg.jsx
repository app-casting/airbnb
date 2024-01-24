/* eslint-disable react/prop-types */
const PlaceImg = ({ place, index=0, className = null }) => {
  if (!place.addedPhotos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover w-full h-full";
  }

  return (
    <img
      src={"http://localhost:4000/uploads/" + place.addedPhotos[index]}
      alt="Photos"
      className={className}
    />
  );
};

export default PlaceImg;
