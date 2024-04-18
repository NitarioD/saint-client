import React, { useEffect, useState, useContext } from "react";
import { message } from "antd";
import { AdminContentContext } from "../../contexts";
import { AuthContext } from "../../contexts";
import axios from "axios";

const UploadImage = () => {
  //context for the content
  const [content, setContent] = useContext(AdminContentContext);
  //context for auth
  const [auth, setAuth] = useContext(AuthContext);

  const handleSelect = async (e) => {
    const file = e.target.files[0];
    if (file?.type?.split("/")[0] != "image") {
      return message.error("Upload an image file");
    }
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post("/image", formData);
    data.ok
      ? message.success(`succesfully upoladed ${file.name}`)
      : message.error(data.error);
  };

  return content == "add image" ? (
    <>
      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={handleSelect}
      />
    </>
  ) : (
    <></>
  );
};
export default UploadImage;
