// @ts-nocheck
"use client";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import { useRouter } from "next/navigation";

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
      <h2 className="p-[10px] text-center text-[1.6rem]">
        We&apos;d love you to subscribe to our activities
      </h2>
      <div className="min-h-[50vh] p-[10px] flex gap-5  justify-center items-center">
        <div className="w-[80%] flex justify-between">
          <div>
            <p className="text-[1.3rem]">Subscribe to our community</p>
          </div>
          <div>
            <div
              className="flex flex-col justify-center items-center w-[100%] gap-3"
              style={{ width: "300px", margin: "0 20px" }}
            >
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
      </div>
    </>
  );
};

export default Subscribe;
