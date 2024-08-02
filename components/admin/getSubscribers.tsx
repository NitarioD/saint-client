// @ts-nocheck
import axios from "axios";

import React, { useEffect, useState, useContext } from "react";
import { List, Pagination } from "antd";
import { AdminContentContext } from "../../contexts";
import capitalise from "../../helperFunctions/capitalise";

const Subscribers = ({ setSubscriberId }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [displayedSubscribers, setDisplayedSubscribers] = useState([]);

  //get admin context via context
  const [content, setContent] = useContext(AdminContentContext);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      if (content == "subscribers") {
        const { data } = await axios.get("/subscribers");
        setSubscribers(data?.subscribers);
        setDisplayedSubscribers(data?.subscribers.slice(0, 10));
      }
    };
    getUsers();
  }, [content]);

  const changePage = (page, pageSize) => {
    if (page == 1) {
      setDisplayedSubscribers(subscribers.slice(0, pageSize));
    } else {
      setDisplayedSubscribers(
        subscribers.slice((page - 1) * pageSize, page * pageSize)
      );
    }
  };

  return content == "subscribers" ? (
    <div>
      <h2>Subscribers</h2>
      <List
        itemLayout="horizontal"
        dataSource={displayedSubscribers}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <a
                key="list-loadmore-more"
                onClick={() => {
                  setContent("subscriber");
                  setSubscriberId(item._id);
                }}
              >
                view subscriber
              </a>,
            ]}
          >
            <div style={{ width: "40%" }}>
              {capitalise(item.fname)} {capitalise(item.lname)}
            </div>
            <List.Item.Meta description={`${item.email}`} />
          </List.Item>
        )}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          pageSize={10}
          defaultCurrent={currentPage}
          total={subscribers.length}
          onChange={changePage}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Subscribers;
