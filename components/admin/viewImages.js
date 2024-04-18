import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Space } from "antd";
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
      <Space size={[8, 16]} wrap>
        {images?.map((image) => (
          <GetImage
            image={image}
            images={images}
            setImages={setImages}
            key={image._id}
            clickedFrom="image"
            imageIdToAdd={imageIdToAdd}
            setImageIdToAdd={setImageIdToAdd}
          />
        ))}
      </Space>
    </>
  ) : (
    <></>
  );
};
export default ViewImages;
