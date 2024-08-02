// @ts-nocheck

import { useState, useEffect } from "react";
import { Card, Space, Input, message, Button } from "antd";
import axios from "axios";
const { TextArea } = Input;

const Home = () => {
  const [homeDetails, setHomeDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHomeDetails = async () => {
      const { data } = await axios.get("/base_page/home");
      if (data.homeDetails) {
        setHomeDetails(data.homeDetails.home);
      }
    };
    if (!homeDetails.header?.h1) {
      getHomeDetails();
    }
  }, [homeDetails]);

  const handleSubmit = async () => {
    setLoading(true);
    const { data } = await axios.post("/base_page/home", { homeDetails });
    if (data.ok) {
      message.success("Post successfully submitted");
    } else {
      message.error("Could not submit the post successfully, try again later!");
    }
    setLoading(false);
  };
  return (
    homeDetails.header?.h1 && (
      <div>
        <Space direction="vertical" size={24}>
          <Card
            title="BANNER IMAGE"
            style={{
              width: "70vw",
              background: "blue",
            }}
          >
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>
                Banner Image Link Id:
              </label>
              <TextArea
                placeholder="paste image id"
                rows={1}
                value={homeDetails?.banner_img}
                onChange={(e) =>
                  setHomeDetails({
                    ...homeDetails,
                    banner_img: e.target.value,
                  })
                }
              />
            </div>
          </Card>
          <Card
            title="HEADER SECTION"
            style={{
              width: "70vw",
              background: "blue",
            }}
          >
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Heading One</label>
              <TextArea
                rows={1}
                value={homeDetails.header?.h1}
                disabled={true}
                style={{ color: "white " }}
              />
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Paragraph</label>
              <TextArea
                rows={4}
                value={homeDetails?.header?.p}
                onChange={(e) =>
                  setHomeDetails({
                    ...homeDetails,
                    header: { ...homeDetails.header, p: e.target.value },
                  })
                }
              />
            </div>
          </Card>
          {/* welcome section */}
          <Card
            title="WELCOME SECTION"
            style={{
              width: "70vw",
              background: "blue",
            }}
          >
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Heading Two</label>
              <TextArea
                rows={1}
                value={homeDetails.welcome?.h2}
                disabled={true}
                style={{ color: "white " }}
              />
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Paragraph</label>
              <TextArea
                rows={4}
                value={homeDetails.welcome?.p}
                onChange={(e) =>
                  setHomeDetails({
                    ...homeDetails,
                    welcome: { ...homeDetails.welcome, p: e.target.value },
                  })
                }
              />
            </div>
          </Card>
          {/* Card section */}
          <Card
            title="CARDS SECTION"
            style={{
              width: "70vw",
              background: "blue",
            }}
          >
            <Space direction="vertical">
              <Card
                title="CARD 1"
                style={{
                  width: "65vw",
                }}
              >
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px" }}>Heading Three</label>
                  <TextArea
                    rows={1}
                    value={homeDetails.cards[0]?.h3}
                    disabled={true}
                  />
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px" }}>Paragraph</label>
                  <TextArea
                    rows={4}
                    value={homeDetails.cards[0]?.p}
                    onChange={(e) =>
                      setHomeDetails({
                        ...homeDetails,
                        cards: [
                          { ...homeDetails.cards[0], p: e.target.value },
                          homeDetails.cards[1],
                          homeDetails.cards[2],
                        ],
                      })
                    }
                  />
                </div>
              </Card>
              <Card
                title="CARD 2"
                style={{
                  width: "65vw",
                }}
              >
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px" }}>Heading Three</label>
                  <TextArea
                    rows={1}
                    value={homeDetails.cards[1]?.h3}
                    disabled={true}
                  />
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px" }}>Paragraph</label>
                  <TextArea
                    rows={4}
                    value={homeDetails.cards[1]?.p}
                    onChange={(e) =>
                      setHomeDetails({
                        ...homeDetails,
                        cards: [
                          homeDetails.cards[0],
                          { ...homeDetails.cards[1], p: e.target.value },
                          homeDetails.cards[2],
                        ],
                      })
                    }
                  />
                </div>
              </Card>
              <Card
                title="CARD 3"
                style={{
                  width: "65vw",
                }}
              >
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px" }}>Heading Three</label>
                  <TextArea
                    rows={1}
                    value={homeDetails.cards[2]?.h3}
                    disabled={true}
                  />
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px" }}>Paragraph</label>
                  <TextArea
                    rows={4}
                    value={homeDetails.cards[2]?.p}
                    onChange={(e) =>
                      setHomeDetails({
                        ...homeDetails,
                        cards: [
                          homeDetails.cards[0],
                          homeDetails.cards[1],
                          { ...homeDetails.cards[2], p: e.target.value },
                        ],
                      })
                    }
                  />
                </div>
              </Card>
            </Space>
          </Card>
          {/* support */}
          <Card
            title="SUPPORT SECTION"
            style={{
              width: "70vw",
              background: "blue",
            }}
          >
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Heading Two</label>
              <TextArea
                rows={1}
                value={homeDetails.support?.h2}
                disabled={true}
                style={{ color: "white " }}
              />
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Paragraph</label>
              <TextArea
                rows={4}
                value={homeDetails.support?.h3}
                onChange={(e) =>
                  setHomeDetails({
                    ...homeDetails,
                    support: { ...homeDetails.support, h3: e.target.value },
                  })
                }
              />
            </div>
          </Card>

          <Card
            title="FINANCIAL SUPPORT SECTION"
            style={{
              width: "70vw",
              background: "blue",
            }}
          >
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Heading Three</label>
              <TextArea
                rows={1}
                value={homeDetails.support?.financial?.h3}
                disabled={true}
                style={{ color: "white" }}
              />
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Paragraph</label>
              <TextArea
                rows={4}
                value={homeDetails.support?.financial?.p}
                onChange={(e) =>
                  setHomeDetails({
                    ...homeDetails,
                    support: {
                      ...homeDetails.support,
                      financial: {
                        ...homeDetails.support.financial,
                        p: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </Card>

          <Card
            title="PRAYER SUPPORT SECTION"
            style={{
              width: "70vw",
              background: "blue",
            }}
          >
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Heading Three</label>
              <TextArea
                rows={1}
                value={homeDetails.support?.prayer?.h3}
                disabled={true}
                style={{ color: "white" }}
              />
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "10px" }}>Paragraph</label>
              <TextArea
                rows={4}
                value={homeDetails.support?.prayer?.p}
                onChange={(e) =>
                  setHomeDetails({
                    ...homeDetails,
                    support: {
                      ...homeDetails.support,
                      prayer: {
                        ...homeDetails.support.prayer,
                        p: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </Card>
        </Space>
        <Button className="publish" onClick={handleSubmit} loading={loading}>
          submit
        </Button>
      </div>
    )
  );
};

export default Home;
