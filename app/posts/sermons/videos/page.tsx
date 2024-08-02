"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useContext } from "react";
import DisplayVideosByTagname from "@/components/displayVideosByTagname";
import { PostsContext } from "@/contexts";
import Loading from "../../../../components/loading";

// @ts-ignore
let editor;

const Videos = () => {
  const [postLoaded, setPostLoaded] = useState(false);
  const [posts, setPosts] = useContext(PostsContext);

  useEffect(() => {
    if (posts[0]) {
      setPostLoaded(true);
    }
  }, [posts]);

  return postLoaded ? (
    <>
      <div id="post" className="flex justify-center ">
        <Badge variant="outline" id="tag">
          <span>Videos</span>
        </Badge>
        <div
          style={{ position: "relative", top: 0 }}
          className="w-[70vw] mt-[50px] overflow-auto max-h-[80vh]"
        >
          {/* @ts-ignore */}
          {posts.map((video) => (
            <DisplayVideosByTagname video={video} key={video[0]} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Videos;
