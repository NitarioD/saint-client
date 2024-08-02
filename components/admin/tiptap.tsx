// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { AdminContentContext } from "../../contexts";
import axios from "axios";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { Modal, Space, Dropdown, message } from "antd";
import {
  UnorderedListOutlined,
  OrderedListOutlined,
  BoldOutlined,
  ItalicOutlined,
  FileImageOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import GetImage from "./getImageComponent";

let addImage;

const MenuBar = ({ editor, showModal }) => {
  if (!editor) {
    return null;
  }

  addImage = (id) => {
    editor
      .chain()
      .focus()
      .setImage({
        src: `${process.env.NEXT_PUBLIC_API}/image/${id}`,
      })
      .run();
  };

  return (
    <div className="tiptap-menu">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h<sub>1</sub>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h<sub>2</sub>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h<sub>3</sub>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h<sub>4</sub>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h<sub>5</sub>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h<sub>6</sub>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        p
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <BoldOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <ItalicOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
        highlight
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <UnorderedListOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <OrderedListOutlined />
      </button>
      <button onClick={showModal}>
        <FileImageOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <AlignLeftOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <AlignCenterOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <AlignRightOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
    </div>
  );
};

const CreatePost = () => {
  //get admin context via context
  const [content, setContent] = useContext(AdminContentContext);

  //local state
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  // handle selected option for post category
  const handleCategorySelection = (e) => {
    const selectedCategory = e.target.attributes.category.value;
    setCategory(selectedCategory);
    message.success(`${selectedCategory} selected`);
  };

  //options in post category
  const items = [
    {
      label: (
        <div onClick={handleCategorySelection} category="evangelism">
          Evangelistic Report
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div onClick={handleCategorySelection} category="teaching">
          Teaching
        </div>
      ),
      key: "1",
    },

    {
      label: (
        <div onClick={handleCategorySelection} category="publication">
          Publication
        </div>
      ),
      key: "2",
    },
  ];

  const handleSubmit = async () => {
    const { data } = await axios.post("/post", {
      ...editor.getJSON(),
      category,
    });
    if (data.ok) {
      message.success("post created");
    } else {
      message.error(`Error: ${data.error}`);
    }
  };

  //modal function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //load images
  useEffect(() => {
    if (content == "Create Post") {
      const getImages = async () => {
        const { data } = await axios.get("/images");
        setImages(data);
      };
      getImages();
    }
  }, [content]);

  const editor = useEditor({
    extensions: [
      // CustomDocument,
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading" && node.attrs.level === 1) {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
      Highlight,
      Image,
    ],
    content: `<h1></h1>
    <p>This is a basic example of implementing images. Drag to re-order.</p>
    <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
    <img src="https://source.unsplash.com/K9QHL52rE2k/800x400" />`,
  });

  return content == "Create Post" ? (
    <div style={{ position: "relative", top: 0 }}>
      <MenuBar editor={editor} showModal={showModal} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ padding: "1rem" }}>
          Selected Post Category:{" "}
          <span
            style={{ background: "blue", padding: "5px", borderRadius: "6px" }}
          >
            {category}
          </span>
        </div>
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()} style={{ padding: "1rem" }}>
            <Space>
              Select Post Category
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      <div className="tiptap-content">
        <button className="publish" onClick={handleSubmit}>
          submit
        </button>
        <EditorContent
          editor={editor}
          style={{ width: "80%", marginBottom: "50px" }}
        />
        <Modal
          title="Image Getter"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Space size={[8, 16]} wrap>
            {images.map((image) => (
              <GetImage
                image={image}
                key={image._id}
                clickedFrom="post"
                handleOk={handleOk}
                addImage={addImage}
              />
            ))}
          </Space>
          <hr />
        </Modal>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default CreatePost;
