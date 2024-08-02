// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Tag, message, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const Tags = ({ newTag, setNewTag, tags, setTags }) => {
  //local states
  const [editTagName, setEditTagName] = useState("");
  //   holds the tag id to be edited or deleted
  const [tagId, setTagId] = useState("");

  //modal functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  //handles what to do after the tagname is edited and confirmed to be edited
  const handleEditedTag = async () => {
    setIsModalOpen(false);
    const { data } = await axios.put(`/video/tag/${tagId}`, {
      tag: editTagName,
    });
    if (data.error) {
      message.error(`${data.error}`);
    } else {
      message.success(`Successfully changed the tag to ${editTagName}`);
      setTags([...tags.filter((tag) => tag._id != tagId), data]);
    }
    setEditTagName("");
    setTagId("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getTags = async () => {
      const { data } = await axios.get("/video/tags");
      setTags(data.tags);
    };
    getTags();
  }, [setTags]);

  useEffect(() => {
    if (newTag != "") {
      setTags([newTag, ...tags]);
      setNewTag("");
    }
  }, [newTag, setNewTag, setTags, tags]);

  const handleEditTag = async (tag) => {
    showModal();
    setEditTagName(tag.tag);
  };

  const handleDeleteTag = (tag) => {
    const deleteTag = async () => {
      const { data } = await axios.delete(`/video/tag/${tag._id}`);

      if (!data.error) {
        setTags([...tags.filter((tag) => tag._id != data._id)]);
        message.success(`${tag.tag} successfully deleted`);
      } else {
        message.error(`${data.error}`);
      }
    };

    confirm({
      content: `Delete Tag: ${tag.tag}`,
      onOk() {
        deleteTag();
      },
    });
  };

  return (
    <>
      {tags.map((tag) => (
        <Tag
          color="cyan"
          key={tag._id}
          style={{ fontSize: "1rem", margin: "5px" }}
        >
          <DeleteOutlined
            style={{ color: "red", marginRight: "5px", cursor: "pointer" }}
            onClick={() => handleDeleteTag(tag)}
          />
          {tag.tag}
          <EditOutlined
            style={{ color: "blue", marginRight: "5px", cursor: "pointer" }}
            onClick={() => {
              handleEditTag(tag);
              setTagId(tag._id);
            }}
          />
        </Tag>
      ))}
      <Modal
        title="Edit Tagname For Video(s)"
        open={isModalOpen}
        onOk={handleEditedTag}
        okText="Edit tag name"
        closeIcon={false}
        onCancel={handleCancel}
      >
        <Input
          value={editTagName}
          onChange={(e) => setEditTagName(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default Tags;
