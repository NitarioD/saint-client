"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useContext } from "react";
import { Pagination } from "antd";
import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PostsContext } from "@/contexts";
import capitaliseHeader from "@/helperFunctions/capitaliseHeader";
import Loading from "@/components/loading";

// @ts-ignore
let editor;

const Publications = ({ params }: { params: { slug: string } }) => {
  const [postLoaded, setPostLoaded] = useState(false);
  const [posts, setPosts] = useContext(PostsContext);

  const router = useRouter();

  useEffect(() => {
    if (posts[0]) {
      if (parseInt(params.slug) > posts.length) {
        return router.push("/404");
      }
      const formattedArticle = capitaliseHeader(
        posts[parseInt(params.slug) - 1].content
      );

      editor = new Editor({
        extensions: [StarterKit, Highlight, Image],
        content: formattedArticle,
        editable: false,
      });
      setPostLoaded(true);
    }
  }, [posts, params.slug, router]);

  const onPageChange = (page: number) => {
    // @ts-ignore
    // editor.commands.setContent(capitaliseHeader(posts[page - 1].content));
    router.push(`/evangelism-reports/${page}`);
  };

  return postLoaded ? (
    <>
      <div id="post" className="flex justify-center">
        <Badge variant="outline" id="tag">
          <span>Evangelism</span>
        </Badge>
        <div style={{ position: "relative", top: 0 }} className="w-[80vw]">
          {/* @ts-ignore */}
          <EditorContent editor={editor} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            <Pagination
              defaultCurrent={parseInt(params.slug)}
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

export default Publications;
