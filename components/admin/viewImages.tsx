import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import GetImage from "./getImageComponent";
import { AdminContentContext } from "../../contexts";

const ViewImages = () => {
  //state for all the images available
  const [images, setImages] = useState([]);
  const [imageIdToAdd, setImageIdToAdd] = useState("");

  //context for the content
  const [content, setContent] = useContext(AdminContentContext);

  useEffect(() => {
    if (content == "view images") {
      const getImages = async () => {
        if (content == "view images") {
          const { data } = await axios.get(`/images`);
          setImages(data);
        }
      };
      getImages();
    }
  }, [content]);

  return content == "view images" && images?.toString() != "[]" ? (
    <>
      <div className="flex flex-wrap gap-4 justify-center max-h-[55vh]">
        {images?.map((image) => (
          <GetImage
            image={image}
            images={images}
            setImages={setImages}
            // @ts-ignore
            key={image._id}
            clickedFrom="image"
            // @ts-ignore
            imageIdToAdd={imageIdToAdd}
            setImageIdToAdd={setImageIdToAdd}
          />
        ))}
      </div>
    </>
  ) : (
    <></>
  );
};
export default ViewImages;
