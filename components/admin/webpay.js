import { MailOutlined } from "@ant-design/icons";
import { Input, InputNumber, Button, message } from "antd";
import axios from "axios";
import { useState } from "react";

const MyPaymentForm = () => {
  const [details, setDetails] = useState({ email: "", amount: 0 });

  const handleSubmit = async () => {
    payWithPaystack();
  };

  //paystack pop-up
  function payWithPaystack(e) {
    let handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: details.email,
      currency: "NGN",
      amount: details.amount * 100,
      onClose: function () {
        message.error("Transaction was not completed, window closed.");
      },
      callback: function (response) {
        const reference = response.reference;
        verify(reference);
      },
    });
    handler.openIframe();
  }

  const verify = async (ref) => {
    const { data } = await axios.get(`/giving/${ref}`);
    if (data.ok) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <script src="paystack_inline.js"></script>
      <form id="paymentForm" style={{ background: "white" }} autoComplete="">
        <Input
          placeholder="Enter your email address"
          name="email"
          autoComplete="email"
          style={{ fontSize: "1rem", color: "gray" }}
          value={details.email}
          type="email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          prefix={
            <MailOutlined
              style={{ marginRight: "15px" }}
              className="site-form-item-icon"
            />
          }
        />
        <br />
        <br />
        <InputNumber
          name="donation"
          addonBefore="₦"
          addonAfter="NGN"
          value={details.amount}
          onChange={(e) => setDetails({ ...details, amount: e })}
        />
        <br />
        <br />
        <Button
          style={{ background: "#417E25", color: "white", fontSize: "1rem" }}
          onClick={handleSubmit}
          block
        >
          Submit
        </Button>
      </form>
    </>
  );
};
export default MyPaymentForm;
