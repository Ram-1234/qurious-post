import React from "react";

const GalleryCard = ({ url, selectImage }) => {
  return (
    <img
      src={url}
      alt={url}
      onClick={() => selectImage(url)}
      style={{ width: "150px", height: "150px", margin: "0 5px" }}
    />
  );
};

export default GalleryCard;
