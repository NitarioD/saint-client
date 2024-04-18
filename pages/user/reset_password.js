import { useRouter } from "next/router";

import { Button, Input, message } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";

const PasswordReset = () => {
  const router = useRouter();

  const [details, setDetails] = useState({
    email: "",
    reset_password: "",
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async () => {
    const { data } = await axios.get(`/reset_password/${details.email}`);
    if (data.error) {
      message.error(`${data.error}`);
    } else {
      message.success(
        "A reset code has been sent to your email. Please enter it"
      );
      setEmailVerified(true);
    }
  };

  const handleSubmit = async () => {};

  return (
    <>
      <div className="password_reset">
        <div style={{ width: "300px" }}>
          <div>To reset your password</div>
          <div>
            <div>
              <Input
                placeholder="Email"
                type="email"
                value={details.email}
                style={{ width: "200px" }}
                disabled={emailVerified}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
              />
              <Button
                // style={{ background: "green", color: "white" }}
                disabled={emailVerified}
                onClick={handleVerifyEmail}
                type="primary"
                loading={loading}
              >
                Verify mail
              </Button>
            </div>
            <div className={!emailVerified ? "hide" : ""}>
              <Input
                placeholder="Reset Code"
                value={details.reset_password}
                style={{ width: "200px" }}
                onChange={(e) =>
                  setDetails({ ...details, lname: e.target.value })
                }
              />
              <Button type="primary" onClick={handleSubmit} loading={loading}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
