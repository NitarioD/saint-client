// @ts-nocheck
import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
import capitalise from "../helperFunctions/capitalise";

// @ts-ignore
const DisplayVideosByTagname = ({ video }) => {
  const [index, setIndex] = useState(0);

  const onPageChange = (page: number) => {
    setIndex(page - 1);
  };

  return (
    <>
      <div
        style={{
          display: "block",
          height: "auto",
          marginBottom: "55px",
          paddingBottom: "55px",
          position: "relative",
          top: 0,
        }}
      >
        <h3 style={{ fontSize: "1.5rem" }}>
          Teachings on: <i>{capitalise(video[0])}</i>
        </h3>

        <iframe
          width="100%"
          height="290px"
          src={video[1][index].link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <h4 style={{ fontSize: "1.2rem" }}>
          {capitalise(video[1][index].title)}
        </h4>
        <h5
          style={{
            fontSize: "1rem",
            float: "left",
            clear: "both",
            paddingRight: "5px",
          }}
        >
          Description:
        </h5>
        <p style={{ color: "gray" }}>{video[1][index].description}</p>

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
            total={video[1].length}
            showSizeChanger={false}
            style={{ position: "absolute", bottom: "0" }}
          />
        </div>
      </div>
    </>
  );
};

export default DisplayVideosByTagname;
