import axios from "axios";
import moment from "moment";
import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Input, Button, message } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import capitalise from "../../helperFunctions/capitalise";
import { AdminContentContext } from "../../contexts";
const { TextArea } = Input;

const BroadcastMessage = () => {
  //get admin context via context
  const [content, setContent] = useContext(AdminContentContext);

  const [loading, setLoading] = useState(false);

  const [mail, setMail] = useState("");

  //css style for muting text
  const muteTextEffect = {
    color: "gray",
  };

  useEffect(() => {}, [content]);

  const handleSendMail = async () => {
    setLoading(true);
    const { data } = await axios.post(`/subscribers/mail`, { mail });
    if (data?.ok) {
      message.success(`Email sent to all subscribers`);
      setMail("");
    } else {
      message.error("There was an error sending this mail, try again later.");
    }
    setLoading(false);
  };

  return (
    content == "broadcast" && (
      <>
        <Card
          style={{
            width: "100%",
          }}
        >
          <div>
            <p style={{ color: "gray", marginBottom: 12 }}>
              Send all subscribers a mail?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextArea
                rows={6}
                placeholder="Enter a message to send"
                value={mail}
                style={{ fontSize: "1rem" }}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div style={{ width: 280, float: "right", marginTop: 24 }}>
              <Button
                block
                type="primary"
                onClick={handleSendMail}
                loading={loading}
              >
                Send Mail
              </Button>
            </div>
          </div>
        </Card>
      </>
    )
  );
};
export default BroadcastMessage;
