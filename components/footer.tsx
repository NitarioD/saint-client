"use client";

import { useEffect, useContext } from "react";
import Link from "next/link";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { BasicContentContext } from "@/contexts";
import { getHomeDetails } from "@/api/api_communications";

const Footer = () => {
  const year = new Date().getFullYear();
  const [basics, setBasics] = useContext(BasicContentContext);

  useEffect(() => {
    type data_params = {
      home: {
        header: {
          h1: string;
          p: string;
        };
        welcome: {
          h2: string;
          p: string;
        };
        support: {};
        banner_img: string;
        cards: [];
      };
      point_man: {
        title: string;
        content: string;
      };
      the_sgf: {
        title: string;
        content: string;
      };
      footer_info: {
        about_us: string;
        location: string;
        quick_links: [];
      };
      _id: string;
    };

    const getBasicDetails = async () => {
      const data = await getHomeDetails();
      // @ts-ignore
      setBasics(data);
    };
    if (!basics?.home?.header?.h1) {
      getBasicDetails();
    }
  }, [basics, setBasics]);

  return (
    <footer className="bg-cyan-950 p-5 text-gray-200">
      <div className="flex gap-3">
        <div className="bg-black/[0.75] rounded-md p-3">
          <h3>About Us</h3>
          <p>{basics.footer_info?.about_us}</p>
        </div>
        <div className="bg-black/[0.75] rounded-md p-3">
          <h3>Our Location</h3>
          <p>{basics.footer_info?.location}</p>
        </div>
      </div>
      <div className="flex justify-center items-center h-[60px]">
        <div className="flex gap-8  bg-black px-[20px] py-2 mt-[20px] rounded-sm">
          <a
            target="_blank"
            href="https://www.youtube.com/@ScriptureGraceFoundation./videos"
            rel="noopener noreferrer"
          >
            <IoLogoYoutube className="text-[3rem] text-[#FF0000] hover:text-white" />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/ScriptureGrace/"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-[3rem] text-[#0000FF] hover:text-white" />
          </a>
        </div>
      </div>
      <div className="flex gap-1 mt-5">
        <h3 className="bg-black/[0.75] rounded-l-md p-3">Quick Links:</h3>
        <ul className="flex gap-2 flex-wrap underline bg-black/[0.75] rounded-r-md p-3">
          {basics.footer_info?.quick_links?.map((link: string, idx: number) => (
            <li className="w-max" key={idx}>
              <Link href={`${link[1]}`} legacyBehavior passHref>
                {link[0]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-black/[0.75] mt-5 rounded-md p-3 text-center">
        The Scripture Grace Foundation. All Rights Reserved. © {year} |Developed
        by{" "}
        <a
          href="https://github.com/NitarioD/"
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "var(--text-color)",
          }}
        >
          NitarioD
        </a>
      </div>
    </footer>
  );
};

export default Footer;
