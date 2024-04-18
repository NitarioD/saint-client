import { Button, Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const Contact = () => {
  const [details, setDetails] = useState({
    name: "",
  });

  return (
    <>
      <Head>
        <meta
          name="description"
          content="The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people, the poor and the rich. We need your support to function effectively. You can contact us at any time"
        />
        <meta
          name="keywords"
          content="support, non-profit, Jesus Christ, evangelism, scripture grace foundation, membership"
        />
      </Head>
      <div className="contact">
        <h2>We'd love to hear from you</h2>
        <p>
          We value your feedback, comment and suggetions so much. Kindly fill
          the form to share your thoughts with us.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-around",
          }}
        >
          <Input
            placeholder="Your Name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
          <Link
            href={`mailto:thescripturegracefoundation@outlook.com?subject=${details.name}%20has%20something to%20say`}
          >
            <Button block type="primary">
              Click To Send Mail To Us!
            </Button>
          </Link>
        </div>
        {/* <div style={{ width: 280, float: "right", marginTop: 24 }}>
          
        </div> */}
      </div>
    </>
  );
};

export default Contact;
