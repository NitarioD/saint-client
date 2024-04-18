import { useRouter } from "next/router";
import Head from "next/head";
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
    <form>
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
        <h2>We are sorry to see you go</h2>
        <p>Proceed to unsubscribe from our community</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
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
          <div style={{ width: 280, float: "right", marginTop: 24 }}>
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
      </div>
    </form>
  );
};

export default UnSubscribe;
