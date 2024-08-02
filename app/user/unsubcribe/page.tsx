"use client";
import { useRouter } from "next/navigation";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";

const UnSubscribe = () => {
  const router = useRouter();

  const [unsubscribeCode, setUnsubscribeCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleGetCode = async () => {
    setLoading(true);
    const { data } = await axios.get(`/subscriber/${email}`);
    if (data?.error) {
      message.error(`${data.error}`);
    } else if (data?.ok) {
      message.success(
        "Unsubscribe code successfully sent to your email. Please enter the code to unsubscribe"
      );
      setCodeSent(true);
    }
    setLoading(false);
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    const { data } = await axios.post(`/unsubscribe/${email}`, {
      unsubscribeCode,
    });
    if (data?.error) {
      message.error(`${data.error}`);
    } else if (data?.ok) {
      message.success(
        "You have successfully unsubscribed from our community, you will no longer be getting mails from us."
      );
      router.push("/");
    }
    setLoading(false);
  };
  return (
    <>
      <h2 className="p-[10px] text-center text-[1.6rem]">
        We are sorry to see you go
      </h2>
      <form>
        <div className="min-h-[50vh] p-[10px] flex gap-5  justify-center items-center">
          <p className="text-[1.3rem]">
            Proceed to unsubscribe from our community
          </p>
          <div className="flex flex-col justify-center gap-5">
            {codeSent ? (
              <Input
                placeholder="Enter the code sent to your email"
                name="code"
                style={{
                  width: "500px",
                }}
                value={unsubscribeCode}
                onChange={(e) => setUnsubscribeCode(e.target.value)}
              />
            ) : (
              <Input
                placeholder="Email"
                name="email"
                autoComplete="email"
                style={{
                  width: "500px",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            {codeSent ? (
              <Button
                block
                style={{ background: "red", color: "white" }}
                onClick={handleUnsubscribe}
                loading={loading}
              >
                Unsubscribe
              </Button>
            ) : (
              <Button
                block
                type="primary"
                onClick={handleGetCode}
                loading={loading}
              >
                Get unSubscribe code
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default UnSubscribe;
