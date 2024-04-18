import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import Head from "next/head";
import { useRouter } from "next/router";

// Usually you only need to import ConfigProvider & CSS once in App.js/App.tsx
// CSS order is important!
import "antd-country-phone-input/dist/index.css";

import { Button, Input, message } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";

const Subscribe = () => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    phone: {
      code: 234,
      phone: "",
      short: "NG",
    },
    email: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    const { data } = await axios.post("/subscriber", {
      details,
    });
    if (data?.error) {
      message.error(`${data.error}`);
    } else if (data?.ok) {
      message.success(`Thank you for joining us ${details.fname}`);
      router.push("/");
    }
    setLoading(false);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <Head>
        <meta
          name="description"
          content="The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people, the poor and the rich. We need your support to function effectively. You can join our membership at any time"
        />
        <meta
          name="keywords"
          content="support, non-profit, Jesus Christ, evangelism, scripture grace foundation, membership"
        />
      </Head>
      <div className="subscribe">
        <h2>We'd love you to subscribe to our activities</h2>
        <p>Subscribe to our community</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ width: "300px", margin: "0 20px" }}>
            <div>
              <Input
                className="input-top"
                placeholder="First Name"
                value={details.fname}
                onChange={(e) =>
                  setDetails({ ...details, fname: e.target.value })
                }
              />
              <Input
                className="input-top"
                placeholder="Last Name"
                value={details.lname}
                onChange={(e) =>
                  setDetails({ ...details, lname: e.target.value })
                }
              />
            </div>
            <div>
              {mounted && (
                <ConfigProvider locale={en}>
                  <CountryPhoneInput
                    className="input-top"
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e })}
                    inline
                  />
                </ConfigProvider>
              )}
              <Input
                className="input-top"
                placeholder="Email"
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
              />
            </div>
            <div style={{ width: 280, float: "right", marginTop: 24 }}></div>
            <Button
              block
              type="primary"
              onClick={handleSubmit}
              loading={loading}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
