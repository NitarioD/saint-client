import React, { useEffect, useState, useContext } from "react";
import { message } from "antd";
import { AdminContentContext } from "../../contexts";
import useInterval from "@/helperFunctions/interval";
// import { AuthContext } from "../../contexts";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

const UploadImage = () => {
  //context for the content
  const [content, setContent] = useContext(AdminContentContext);
  const [progress, setProgress] = useState(0);
  const [milliseconds, setmilliseconds] = useState(0);
  //context for auth
  // const [auth, setAuth] = useContext(AuthContext);

  //@ts-ignore
  const handleSelect = async (e) => {
    setmilliseconds(1000);
    const file = e.target.files[0];
    if (file?.type?.split("/")[0] != "image") {
      return message.error("Upload an image file");
    }
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post("/image", formData);
    if (data.ok) {
      message.success(`succesfully upoladed ${file.name}`);
    } else {
      message.error(data.error);
    }
    setmilliseconds(0);
  };

  useInterval(() => {
    if (progress <= 98) {
      setProgress(progress + 1);
    }
  }, milliseconds);

  return content == "add image" ? (
    <div className="flex flex-col gap-5">
      <div>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleSelect}
        />
      </div>
      {milliseconds > 0 ? <Progress value={progress} /> : ""}
    </div>
  ) : (
    <></>
  );
};
export default UploadImage;
