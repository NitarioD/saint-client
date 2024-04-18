import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, Form, Input, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { ArrowRightOutlined } from "@ant-design/icons";

const SignUp = () => {
  const router = useRouter();

  //state
  const [signupDetails, setSignupDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    password_confirmed: "",
  });
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  //handle button disable
  useEffect(() => {
    const checkDisable = () => {
      if (
        signupDetails.fname &&
        signupDetails.lname &&
        signupDetails.email &&
        signupDetails.password &&
        signupDetails.password_confirmed
      ) {
        setDisableSubmit(false);
      } else {
        setDisableSubmit(true);
      }
    };
    checkDisable();
  }, [signupDetails]);

  const handleChange = (e) => {
    setSignupDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onFinish = async () => {
    if (signupDetails.password != signupDetails.password_confirmed) {
      toast.error("Passwords do not match");
      return;
    }
    const api = process.browser && process.env.NEXT_PUBLIC_API;
    setLoading(true);
    //send all the vales in signupDetails except password_confirmed
    const { data } = await axios.post(`${api}/signup`, {
      ...signupDetails,
      password_confirmed: undefined,
    });
    if (data.error) {
      toast.error(data.error);
    }
    if (data._id) {
      toast.success("successful signup");
      router.push("/signin");
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "86vh",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "700px" }}>
        <h2
          style={{ color: "blue", textAlign: "center", marginBottom: "30px" }}
        >
          Create Account
        </h2>
        <Row>
          <Col span={10} offset={7}>
            <Form
              layout="horizontal"
              style={{
                marginTop: "15px",
              }}
            >
              <Form.Item>
                <Input
                  placeholder="First name"
                  name="fname"
                  value={signupDetails.fname}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Last name"
                  name="lname"
                  value={signupDetails.lname}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={signupDetails.email}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={signupDetails.password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Confirm Password"
                  name="password_confirmed"
                  type="password"
                  value={signupDetails.password_confirmed}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item>
                <a
                  style={{
                    float: "right",
                    fontSize: "1rem",
                    marginBottom: "16px",
                  }}
                  onClick={() => {
                    router.push("/signin");
                    setSpinner(true);
                  }}
                >
                  <Spin spinning={spinner} />
                  <i>
                    Login <ArrowRightOutlined />
                  </i>
                </a>
                {!disableSubmit ? (
                  <Button type="primary" block onClick={onFinish}>
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    block
                    onClick={onFinish}
                    loading={loading}
                    disabled
                  >
                    Submit
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default () => <SignUp />;
