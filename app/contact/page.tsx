"use client";

import { Button, Input } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";

const Contact = () => {
  const [details, setDetails] = useState({
    name: "",
  });

  return (
    <>
      <div className="min-h-[50vh] flex gap-4 px-[8vw] ">
        <div className="flex justify-center align-middle flex-col w-[50vw] bg-[#020D11] text-white px-3 h-[40vh] sm:h-[45vh] my-auto gap-2 rounded-sm ">
          <h2 className="text-[2rem] sm:text-[1.2rem] ">
            We&apos;d love to hear from you
          </h2>
          <p className="text-[1rem] sm:text-[0.8rem] text-justify">
            We value your feedback, comment and suggetions so much. Kindly fill
            the form to share your thoughts with us.
          </p>
        </div>
        <div className="flex justify-center align-middle flex-col gap-3 w-[100%]">
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
