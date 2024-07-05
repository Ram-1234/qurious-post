import React, { useEffect, useState } from "react";
import GalleryCard from "./gallerycard";
import "./style.css"

const Gallery = () => {
  const [page, setPageNumber] = useState(1);
  const [jsonData, setJsonData] = useState([]);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);

  async function fetchApi(page) {
    setLoader(true);
    let apikey = "eU0_yrynUCuQzPuxAVlq1yeKDngODdQbRDxKbZX2sXI";
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=office&client_id=${apikey}`;

    let data = await fetch(url);
    let jsonValue = await data.json();

    if (jsonValue.results) {
      setLoader(false);
      setJsonData(jsonValue.results);
    } else {
      //setLoader(false);
    }
  }

  useEffect(() => {
    fetchApi(page);
  }, [page]);

  const selectedImage = (url) => {
    setUrl(url);
  };

  return (
    <>
      {jsonData?.length &&
        jsonData.map((item) => {
          return (
            <GalleryCard
              selectImage={selectedImage}
              key={item.urls.full}
              url={item.urls.small}
            />
          );
        })}
      <div className="gallery_button" style={{ display: "flex" }}>
        <button className="prev_button" onClick={() => setPageNumber(page - 1)}>prev</button>
        <button className="next_button" onClick={() => setPageNumber(page + 1)}>next</button>
      </div>
    </>
  );
};

export default Gallery;
