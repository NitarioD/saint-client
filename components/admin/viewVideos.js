import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { List, Pagination, Modal, message } from "antd";
import capitalise from "../../helperFunctions/capitalise";
import { AdminContentContext } from "../../contexts";
import EditVideos from "./editVideo";

const { confirm } = Modal;

const ViewVideos = () => {
  const noOfListsPerPage = 10;

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  //hold list item to be edited
  const [itemToBeEdited, setItemToBeEdited] = useState({});

  const [displayedList, setDisplayedList] = useState([]);
  //for video link
  const [videoInfo, setVideoInfo] = useState({});

  //get admin context via context
  const [content, setContent] = useContext(AdminContentContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (content == "View Videos") {
      const getVideos = async () => {
        const { data } = await axios.get("/videos");
        setLoading(false);
        setList(data);
        setDisplayedList(data.slice(0, noOfListsPerPage));
      };
      getVideos();
    }
  }, [content]);

  const onPageChange = (page, pageSize) => {
    if (page == 1) {
      setDisplayedList(list.slice(0, pageSize));
    } else {
      setDisplayedList(list.slice((page - 1) * pageSize, page * pageSize));
    }
  };

  //modal function
  const handleSave = async () => {
    setIsModalOpen(false);

    const { data } = await axios.put("/videos", { videoInfo });

    if (data.error) {
      message.error(`${data.error}`);
    } else {
      setDisplayedList(data);
      message.success("Video successfully updated");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async (item) => {
    setItemToBeEdited(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    const deleteVideo = async () => {
      const { data } = await axios.delete(`/video/${item._id}`);

      if (!data.error) {
        setDisplayedList([
          ...displayedList.filter((video) => video._id != data._id),
        ]);
        message.success(`${data.title} successfully deleted`);
      } else {
        message.error(`${data.error}`);
      }
    };

    confirm({
      content: `Delete Video: ${capitalise(item.title)}`,
      onOk() {
        deleteVideo();
      },
    });
  };
  return content == "View Videos" ? (
    <>
      <div
        style={{
          position: "relative",
          bottom: 0,
          minHeight: "80vh",
        }}
      >
        <h3 style={{ borderBottom: "2px solid black" }}>Videos</h3>
        <List
          className="video-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={displayedList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <button
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>,
                <button
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>,
              ]}
            >
              <h4 style={{ width: "50%" }}>{capitalise(item.title)}</h4>
              <div style={{ width: "20%" }}>
                <span>{capitalise(item.tag.tag)}</span>
              </div>
            </List.Item>
          )}
        />
        <Modal
          title="Edit Video"
          open={isModalOpen}
          onOk={handleSave}
          width={900}
          okText="Save"
          closeIcon={false}
          onCancel={handleCancel}
        >
          <EditVideos
            itemToBeEdited={itemToBeEdited}
            videoInfo={videoInfo}
            setVideoInfo={setVideoInfo}
          />
        </Modal>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Pagination
            defaultCurrent={1}
            onChange={onPageChange}
            pageSize={noOfListsPerPage}
            total={list.length}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};
export default ViewVideos;
