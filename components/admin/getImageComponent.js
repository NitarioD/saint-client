import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Card, message, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const GetImage = ({
  image,
  addImage,
  handleOk,
  images,
  setImages,
  clickedFrom,
}) => {
  const handleDelete = async (id) => {
    const certain = confirm("Are you sure you want to delete?");
    if (certain) {
      const { data } = await axios.delete(`/image/${id}`);
      if (data.ok) {
        message.success("image deleted successfully");
        const updatedImages = images.filter((img) => img._id != id);
        setImages(updatedImages);
      } else {
        message.error("image delete unsuccessful, try again!");
      }
    }
  };

  //function to handle click
  const handleClick = () => {
    addImage && addImage(image._id);
    handleOk && handleOk();
  };
  return (
    <Card
      hoverable
      style={{
        width: 200,
        height: 280,
        textAlign: "center",
      }}
      onClick={handleClick}
      cover={
        <img
          alt="example"
          height={220}
          src={`${process.env.NEXT_PUBLIC_API}/image/${image._id}`}
        />
      }
    >
      {clickedFrom == "image" ? (
        <DeleteOutlined
          style={{
            padding: "5px",
            backgroundColor: "white",
            color: "red",
            borderRadius: "100%",
            boxShadow: "2px 1px 3px ",
          }}
          onClick={() => handleDelete(image._id)}
        />
      ) : (
        <></>
      )}
    </Card>
  );
};

export default GetImage;
