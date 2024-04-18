import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import capitaliseHeader from "../../../helperFunctions/capitaliseHeader";
import Loading from "../../../components/loading";

let editor;

const Teachings = () => {
  const [postLoaded, setPostLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`/posts/teaching`);

      if (data.toString()) {
        setPosts(data);
      }

      const formattedArticle = capitaliseHeader(data[0].content);

      editor = new Editor({
        extensions: [StarterKit, Highlight, Image],
        content: formattedArticle,
        editable: false,
      });
      setPostLoaded(true);
    };

    getPost();
  }, []);

  const onPageChange = (page) => {
    editor.commands.setContent(capitaliseHeader(posts[page - 1].content));
  };

  return postLoaded ? (
    <>
      <div className="post">
        <span>
          <h2>Teaching</h2>
        </span>
        <div style={{ position: "relative", top: 0 }}>
          <EditorContent editor={editor} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            <Pagination
              defaultCurrent={1}
              onChange={onPageChange}
              pageSize={1}
              total={posts.length}
              showSizeChanger={false}
              style={{ position: "absolute", bottom: "0" }}
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Teachings;
