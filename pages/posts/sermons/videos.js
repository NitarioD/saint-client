import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import sortByTags from "../../../helperFunctions/sortVideosByTagname";
import Loading from "../../../components/loading";
import DisplayVideosByTagname from "../../../components/displayVideosByTagname";

const VideoSermon = () => {
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const { data } = await axios.get(`/videos`);

      if (data.toString()) {
        setVideos(sortByTags(data));
      }

      setVideosLoaded(true);
    };

    getVideos();
  }, []);

  return videosLoaded && videos.toString() ? (
    <>
      <Head>
        <meta
          name="description"
          content="The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people, the poor and the rich. We need your support to function effectively. You can join our membership at any time. You can watch sermons by Evangelist Ayobami Adunola here"
        />
        <meta
          name="keywords"
          content="support, non-profit, Jesus Christ, evangelism, scripture grace foundation, membership"
        />
      </Head>
      <div className="post">
        <span>
          <h2>Video Sermons</h2>
        </span>
        <div style={{ position: "relative", top: 0 }}>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {videos.map((video) => (
              <DisplayVideosByTagname video={video} key={video[0]} />
            ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default VideoSermon;
