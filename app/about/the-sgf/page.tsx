"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";
import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BasicContentContext } from "@/contexts";
import capitaliseHeader from "@/helperFunctions/capitaliseHeader";
import Loading from "@/components/loading";

// @ts-ignore
let editor;

const TheSGF = () => {
  const [postLoaded, setPostLoaded] = useState(false);
  const [basics, setBasics] = useContext(BasicContentContext);

  useEffect(() => {
    if (basics.point_man?.content) {
      const formattedArticle = capitaliseHeader(
        `<h1>${basics.the_sgf.title}</h1> ${basics.the_sgf.content}`
      );

      editor = new Editor({
        extensions: [StarterKit, Highlight, Image],
        content: formattedArticle,
        editable: false,
      });
      setPostLoaded(true);
    }
  }, [basics]);

  return postLoaded ? (
    <>
      <div id="post" className="flex justify-center">
        <div style={{ position: "relative", top: 0 }} className="w-[80vw]">
          {/* @ts-ignore */}
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default TheSGF;
