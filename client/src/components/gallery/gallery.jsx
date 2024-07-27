import React, { useContext, useEffect, useState } from "react";
import GalleryCard from "./gallerycard";
import "./style.css"
import { AuthContext } from "../../context/auth-context";
import Loader from "../loader/loader";


const Gallery = () => {
  const [page, setPageNumber] = useState(1);
  const [jsonData, setJsonData] = useState([]);
  const {setURLHandler,setModalHandler,setLoading, loading} = useContext(AuthContext);

  useEffect(() => {
    fetchApi(page);
  }, [page]);

  async function fetchApi(page) {
    setLoading(true);
    let apikey = "eU0_yrynUCuQzPuxAVlq1yeKDngODdQbRDxKbZX2sXI";
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=office&client_id=${apikey}`;

    let data = await fetch(url);
    let jsonValue = await data.json();

    if (jsonValue.results) {
      setJsonData(jsonValue.results);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  const selectedImage = (url) => {
    setURLHandler(url);
    setModalHandler(false);
  };

  return (
    <div className="gallery_box">
      {!loading ?
        jsonData.map((item) => {
          return (
            <GalleryCard
              selectImage={selectedImage}
              key={item.urls.full}
              url={item.urls.small}
            />
          );
        }):<Loader/>}
      <div className="gallery_button" style={{ display: "flex" }}>
        <button className="prev_button" onClick={() => setPageNumber(page - 1)}>prev</button>
        <button className="next_button" onClick={() => setPageNumber(page + 1)}>next</button>
      </div>
    </div>
  );
};

export default Gallery;
