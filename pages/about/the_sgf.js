import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

let editor;

const AboutSGF = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const getPointMan = async () => {
      const { data } = await axios.get(`/base_page/about_sgf`);

      setContent(data.content);

      editor = new Editor({
        extensions: [StarterKit, Highlight, Image],
        content: data.content,
        editable: false,
      });
    };
    getPointMan();
  }, []);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people, the poor and the rich. We need your support to function effectively. You can read about the scripture grace foundation here"
        />
        <meta
          name="keywords"
          content="support, non-profit, Jesus Christ, evangelism, scripture grace foundation, membership"
        />
      </Head>
      <div className="basePost">
        <div style={{ position: "relative", top: 0 }}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};

export default AboutSGF;
