// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
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
  const handleDelete = async (id: string) => {
    const certain = confirm("Are you sure you want to delete?");
    if (certain) {
      const { data } = await axios.delete(`/image/${id}`);
      if (data.ok) {
        message.success("image deleted successfully");
        const updatedImages = images.filter(
          (img: { _id: string }) => img._id != id
        );
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
        width: 250,
        height: 280,
        textAlign: "center",
      }}
      onClick={handleClick}
      cover={
        <Image
          width={10000}
          height={0}
          alt="image"
          className="h-[225px]"
          src={`${process.env.NEXT_PUBLIC_API_URL}/image/${image._id}`}
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
