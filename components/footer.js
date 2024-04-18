import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const Footer = () => {
  const year = new Date().getFullYear();
  const router = useRouter();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const getHomeDetails = async () => {
      const { data } = await axios.get("/base_page/footer_info");

      if (data.details) {
        setDetails(data.details.footer_info);
      }
    };
    getHomeDetails();
  }, []);
  return (
    <footer>
      <div className="row-one">
        <div>
          <h3>About Us</h3>
          <p>{details.about_us}</p>
        </div>
        <div>
          <h3>Our Location</h3>
          <p>{details.location}</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            {details.quick_links?.map((link) => (
              <li onClick={() => router.push(link[1])} key={uuidv4()}>
                {link[0]}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="copyright">
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
