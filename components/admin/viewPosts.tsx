import React, { useEffect, useState, useContext } from "react";
import { AdminContentContext } from "../../contexts";
import { List, message, Pagination } from "antd";
import axios from "axios";
import EditPost from "./editPost";

const ViewPost = () => {
  //get admin context via context
  const [content, setContent] = useContext(AdminContentContext);

  const [posts, setPosts] = useState([]);
  const [postID, setPostID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // post page to show
  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    if (content == "View Posts") {
      const postsGetter = async () => {
        const { data } = await axios.get(`/posts`);
        setPosts(data);
        setDisplayedPosts(data.slice(0, 10));
      };
      postsGetter();
    }
  }, [content]);

  // @ts-ignore
  const handleEdit = async (e) => {
    const itemID = e.target.attributes.itemid.value;
    setPostID(itemID);
    setContent("Edit Post");
  };

  // @ts-ignore
  const handleDelete = async (e) => {
    const itemID = e.target.attributes.itemid.value;
    // @ts-ignore
    const title = posts.filter((post) => post._id === itemID)[0].title;
    const confirmation = prompt(
      `If you want to delete post "${title}", type 'sure' `
    );

    if (
      confirmation?.toLowerCase() === "sure" ||
      confirmation?.toLowerCase() === "'sure'"
    ) {
      const { data } = await axios.delete(`/post/${itemID}`);
      if (data._id) {
        message.success("Post successfully deleted");
        // @ts-ignore
        setDisplayedPosts(posts.filter((post) => post._id != data._id));
      } else {
        message.error(`$  {data.error}`);
      }
    }
  };

  const changePage = (page: number, pageSize: number) => {
    if (page == 1) {
      setDisplayedPosts(posts.slice(0, pageSize));
    } else {
      setDisplayedPosts(posts.slice((page - 1) * pageSize, page * pageSize));
    }
  };

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return content == "View Posts" ? (
    <div>
      <h2>Posts</h2>
      <List
        itemLayout="horizontal"
        dataSource={displayedPosts}
        renderItem={(item) => (
          <List.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "65%" }} className="line-clamp-3 capitalize">
                {/* @ts-ignore */}
                {item.title}
              </div>
              {/* @ts-ignore */}
              <p>{item.category}</p>
              <button
                style={{ color: "blue", cursor: "pointer " }}
                onClick={handleEdit}
                // @ts-ignore
                itemID={item._id}
              >
                Edit
              </button>
              <button
                style={{ color: "red", cursor: "pointer " }}
                onClick={handleDelete}
                // @ts-ignore
                itemID={item._id}
              >
                Delete
              </button>
            </div>
          </List.Item>
        )}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          defaultCurrent={currentPage}
          total={posts.length}
          onChange={changePage}
        />
      </div>
    </div>
  ) : content == "Edit Post" ? (
    <EditPost postID={postID} />
  ) : (
    <></>
  );
};
export default ViewPost;
