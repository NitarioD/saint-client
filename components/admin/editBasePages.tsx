// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { Button, Dropdown, Space } from "antd";
import { AdminContentContext } from "../../contexts";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import Home from "../../components/admin/basePages/home";
import EditPointMan from "../../components/admin/basePages/point_man";
import EditAboutSGF from "./basePages/the_sgf";
import FooterInfo from "./basePages/footer_info";

const EditBasePages = () => {
  //get admin context via context
  const [content, setContent] = useContext(AdminContentContext);

  const [pageToEdit, setPageToEdit] = useState("Home");

  const onClick = (e) => {
    switch (e.key) {
      case "1":
        setPageToEdit("Home");
        break;
      case "2":
        setPageToEdit("About Point Man");
        break;
      case "3":
        setPageToEdit("About The SGF");
        break;
      case "4":
        setPageToEdit("FooterInfo");
        break;
      default:
        break;
    }
  };

  return content == "Edit BasePages" ? (
    <div>
      <h2 style={{ borderBottom: "1px solid black" }}>Edit Page</h2>
      <div style={{ overflowY: "scroll", height: "82vh", marginTop: "15px" }}>
        <div
          style={{
            display: "flex",
            marginBottom: "15px",
            justifyContent: "space-between",
          }}
        >
          <span>
            Page Selected: <Button disabled={true}>{pageToEdit}</Button>
          </span>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Select Page To Edit
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        {pageToEdit == "Home" && <Home />}
        {pageToEdit == "About Point Man" && (
          <EditPointMan pageToEdit={pageToEdit} />
        )}
        {pageToEdit == "About The SGF" && (
          <EditAboutSGF pageToEdit={pageToEdit} />
        )}
        {pageToEdit == "FooterInfo" && <FooterInfo pageToEdit={pageToEdit} />}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default EditBasePages;

const items = [
  {
    key: "1",
    label: <div style={{ textAlign: "center" }}>Home</div>,
  },
  {
    key: "2",
    label: <div style={{ textAlign: "center" }}>About Point Man</div>,
  },
  {
    key: "3",
    label: <div style={{ textAlign: "center" }}>About The SGF</div>,
  },
  {
    key: "4",
    label: <div style={{ textAlign: "center" }}>Footer Info</div>,
  },
];
