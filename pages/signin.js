import { useState, useContext } from "react";
import {
  LockOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Spin } from "antd";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts";
import axios from "axios";
const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  //hook
  const router = useRouter();

  const onFinish = async () => {
    setLoading(true);
    const { data } = await axios.post("/login", loginDetails);
    if (data.error) {
      toast.error(data.error);
      setLoading(false);
    } else {
      setAuth({
        user: data.user,
        token: data.token,
      });

      localStorage.setItem("auth", JSON.stringify(data));
      toast.success("Succesfully logged in");
      const role = data.user.role;
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "user") {
        router.push("/");
      }
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
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
          Login
        </h2>
        <Row>
          <Col span={8} offset={8}>
            <Form name="normal_login" className="login-form">
              <Form.Item>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="email"
                  name="email"
                  value={loginDetails.email}
                  onChange={handleChange}
                  style={{ fontSize: "20px" }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginDetails.password}
                  onChange={handleChange}
                  style={{ fontSize: "20px" }}
                />
              </Form.Item>
              <Form.Item>
                <a
                  style={{ float: "right", fontSize: "1rem" }}
                  onClick={() => {
                    router.push("/signup");
                    setSpinner(true);
                  }}
                >
                  <Spin spinning={spinner} />
                  <i style={{ marginRight: "12px" }}>
                    Signup <ArrowRightOutlined />
                  </i>
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ fontSize: "20px" }}
                  onClick={onFinish}
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Login;
