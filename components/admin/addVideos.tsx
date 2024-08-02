// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { AdminContentContext } from "../../contexts";
import axios from "axios";
import { Modal, Space, Dropdown, message, Button, Input } from "antd";
import { DownOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Tags from "./tags";
const { TextArea } = Input;

const CreateVideos = () => {
  //get admin context via context
  const [content, setContent] = useContext(AdminContentContext);

  //local states
  const [tagName, setTagName] = useState("");
  //contains newly created tagname
  const [newTag, setNewTag] = useState("");
  //for video link
  const [videoInfo, setVideoInfo] = useState({
    title: "",
    link: "",
    tag: "",
    description: "",
  });

  //tags
  const [tags, setTags] = useState([]);

  //function to get tags in the format it can be used for the dropdown option
  const tagItems = () => {
    return tags.map((tag) => ({ label: tag.tag, key: tag._id }));
  };

  //set Tag for videoInfo
  const onClick = (tag) => setVideoInfo({ ...videoInfo, tag: tag.key });

  const handleSubmit = async () => {
    const { data } = await axios.post("/video", { videoInfo });
    if (data?.error) {
      message.error(data.error);
    } else {
      message.success("This video has been successfully uploaded");
      setVideoInfo({
        title: "",
        link: "",
        tag: "",
        description: "",
      });
    }
  };
  const handleNewTagName = (e) => {
    setTagName(e.target.value);
  };

  const handleSubmitTagName = async () => {
    const { data } = await axios.post("/video/new_tag", { tagName });
    if (data.error) {
      message.error(`${data.error}`);
    } else {
      setNewTag(data);
      message.success("Tag successfully created");
      setTagName("");
    }
  };

  return content == "Add Videos" ? (
    <>
      <div
        style={{
          display: "flex",
          height: "110px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "35%" }}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              placeholder="Enter new tag name"
              value={tagName}
              onChange={handleNewTagName}
            />
            <Button type="primary" onClick={handleSubmitTagName}>
              Create New Tag
            </Button>
          </Space.Compact>
        </div>
        <div
          style={{
            width: "60%",
            borderTop: "5px solid black",
            borderLeft: "5px solid black",
          }}
        >
          <h2 style={{ textAlign: "right" }}> Video Tags</h2>
          <hr />
          <div style={{ overflowY: "scroll", height: "100px" }}>
            <Tags
              newTag={newTag}
              setNewTag={setNewTag}
              tags={tags}
              setTags={setTags}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "85px" }}>
        <div>
          <Input
            style={{ marginBottom: "5px" }}
            placeholder="Enter the title for the video"
            value={videoInfo.title}
            onChange={(e) =>
              setVideoInfo({ ...videoInfo, title: e.target.value })
            }
          />
          <Input
            style={{ marginBottom: "5px" }}
            placeholder="Enter Youtube embed for the video"
            value={videoInfo.link}
            onChange={(e) =>
              setVideoInfo({ ...videoInfo, link: e.target.value })
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>
                Seleted tag:{" "}
                <span
                  style={{
                    background: "blue",
                    color: "white",
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                >
                  {tags.filter((tag) => tag._id === videoInfo.tag)[0]?.tag}
                </span>
              </p>
              <Dropdown
                menu={{
                  items: tagItems(),
                  onClick,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Select Video Tag
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <TextArea
              rows={4}
              style={{ width: "60%" }}
              value={videoInfo.description}
              placeholder="Enter the description for this video"
              onChange={(e) =>
                setVideoInfo({ ...videoInfo, description: e.target.value })
              }
            />
            <Button type="primary" onClick={handleSubmit}>
              Post video
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};
export default CreateVideos;
