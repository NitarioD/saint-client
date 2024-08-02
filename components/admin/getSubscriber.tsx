// @ts-nocheck
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Input, Button, message } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import capitalise from "../../helperFunctions/capitalise";
import { AdminContentContext } from "../../contexts";
const { TextArea } = Input;

const tabListNoTitle = [
  {
    key: "subscriber_information",
    label: "Subscriber information",
  },
  {
    key: "send_email",
    label: "Send Subscriber A Mail",
  },
];

const Subscriber = ({ subscriberId }) => {
  //get admin context via context
  const [content, setContent] = useContext(AdminContentContext);

  const [loading, setLoading] = useState(false);

  //controls for content interface
  const [activeTabKey, setActiveTabKey] = useState("subscriber_information");
  const [mail, setMail] = useState("");

  //settting and updating user after getting the user
  const [subscriberInfo, setSubscriberInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });

  //css style for muting text
  const muteTextEffect = {
    color: "gray",
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  useEffect(() => {
    const toggleAction = async () => {
      if (content == "subscriber" && activeTabKey == "subscriber_information") {
        const { data } = await axios.get(`/subscribers/${subscriberId}`);
        setSubscriberInfo(data);
      }
    };
    toggleAction();
  }, [content, activeTabKey, subscriberId]);

  const handleSendMail = async () => {
    setLoading(true);
    const { data } = await axios.post(
      `/subscriber/mail/${subscriberInfo.email}`,
      { mail }
    );
    if (data?.ok) {
      message.success(`Email sent to ${capitalise(subscriberInfo.fname)}`);
      setMail("");
      setActiveTabKey("subscriber_information");
    } else {
      message.error(
        "There was an error sending this mail, it is possible the subscriber's email address is not functional. Regardless, try again later."
      );
    }
    setLoading(false);
  };

  return content == "subscriber" ? (
    activeTabKey == "subscriber_information" ? (
      <>
        <Card
          style={{
            width: "100%",
          }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{
            size: "middle",
          }}
        >
          <Card>
            {/* style={} cover={} */}
            <Card.Meta
              title={`NAME: ${capitalise(subscriberInfo.fname)} ${capitalise(
                subscriberInfo.lname
              )}`}
              description={`Date of Subscription: ${moment(
                subscriberInfo.createdAt
              )}`}
            />
            <Row style={{ ...muteTextEffect, marginTop: "20px" }}>
              <Col span={6}>Firstname</Col>
              <br />
              <Col span={18}>{capitalise(subscriberInfo.fname)}</Col>
            </Row>
            <Row style={muteTextEffect}>
              <Col span={6}>Lastname</Col>
              <br />
              <Col span={18}>{capitalise(subscriberInfo.lname)}</Col>
            </Row>
            <Row style={muteTextEffect}>
              <Col span={6}>
                <MailOutlined />
              </Col>
              <br />
              <Col span={18}>{subscriberInfo.email}</Col>
            </Row>
            <Row style={muteTextEffect}>
              <Col span={6}>
                <PhoneOutlined />
              </Col>
              <br />
              <Col span={18}>{subscriberInfo.phone}</Col>
            </Row>
          </Card>
        </Card>
      </>
    ) : (
      <>
        <Card
          style={{
            width: "100%",
          }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{
            size: "middle",
          }}
        >
          <div>
            <p style={{ color: "gray", marginBottom: 12 }}>
              Send {capitalise(subscriberInfo.fname)} a mail?
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
  ) : (
    <></>
  );
};
export default Subscriber;
