import { useState } from "react";
import UploadWidget from "./uploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

// import "./styles.css";

export default function Wrap() {
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("dfmlp2fo6");
  // Replace with your own upload preset
  const [uploadPreset] = useState("uploadUserAvatar");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset
  });

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  return (
    <div className="App">
      <UploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
    </div>
  );
}
