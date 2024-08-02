import { Card } from "antd";
// import MyPaymentForm from "../components/admin/webpay";

const Giving = () => {
  return (
    <>
      <div id="giving" className="flex justify-center">
        <Card
          bordered={false}
          className="w-[60vw] h-[500px] my-[50px]  bg-[rgb(2,13,17)]"
        >
          <div className="text-white text-[30px] text-center">
            Bank Transfer
          </div>
          <div className="flex flex-col justify-center h-[370px]">
            <Card bordered={false} className="text-black h-[150px]">
              <h2>STANBIC BANK</h2>
              <hr />
              <br />
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
