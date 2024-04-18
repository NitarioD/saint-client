import { Card } from "antd";
import Head from "next/head";
import MyPaymentForm from "../components/admin/webpay";

const Giving = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people. We need your support to function effectively."
        />
        <meta
          name="keywords"
          content="support, non-profit, Jesus Christ, evangelism, scripture grace foundation"
        />
      </Head>
      <div className="giving">
        <Card
          title="Bank Transfer"
          bordered={false}
          style={{
            width: "500px",
            height: 500,
            marginTop: "10px",
            marginBottom: "10px",
            background: "blue",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", height: 400 }}>
            <Card
              title="STANBIC BANK"
              bordered={false}
              style={{
                width: "80%",
                height: 150,
              }}
            >
              ACCOUNT NUMBER: 920 246 8873
            </Card>
          </div>
        </Card>
        {/* <Card
          title="Online Banking"
          bordered={false}
          style={{
            width: "500px",
            height: 500,
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            background: "blue",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", height: 400 }}>
            <Card
              title="STANBIC BANK"
              bordered={false}
              style={{
                width: "80%",
                height: 300,
              }}
            >
              <MyPaymentForm />
            </Card>
          </div>
        </Card> */}
      </div>
    </>
  );
};

export default Giving;
