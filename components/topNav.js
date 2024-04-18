import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const TopNav = () => {
  const router = useRouter();

  const [isActive, setIsActive] = useState("");
  const [isLaptop, setIsLaptop] = useState(false);
  //toggle menu for mobile view
  const [showMenu, setShowMenu] = useState(false);

  //find out if the screen is laptop
  useEffect(() => {
    setIsLaptop(process.browser && window.innerWidth >= 930);
  }, [process.browser && window.innerWidth]);

  //change the caret direction for sermon
  const [showCaretDownSermon, setShowCaretDownSermon] = useState(false);
  //change the caret direction for about
  const [showCaretDown, setShowCaretDown] = useState(false);

  const handleClick = async (e) => {
    if (e.target.innerHTML.toLowerCase() == "home" && isActive != "home") {
      setIsActive("home");
      router.push("/");
    } else if (
      e.target.innerHTML.toLowerCase() == "evangelism reports" &&
      isActive != "evangelism reports"
    ) {
      setIsActive("evangelism");
      router.push("/evangelism");
    } else if (
      e.target.innerHTML.toLowerCase() == "teachings" &&
      isActive != "teachings"
    ) {
      const link = `posts/sermons/teachings`;
      await router.push("/" + link);
      setIsActive("sermons");
    } else if (
      e.target.innerHTML.toLowerCase() == "videos" &&
      isActive != "videos"
    ) {
      const link = `posts/sermons/videos`;
      await router.push("/" + link);
      setIsActive("sermons");
    } else if (
      e.target.innerHTML.toLowerCase() == "publications" &&
      isActive != "publications"
    ) {
      await router.push(`/posts/sermons/publications`);
      setIsActive("sermons");
    } else if (
      e.target.innerHTML.toLowerCase() == "giving" &&
      isActive != "giving"
    ) {
      await router.push(`/${e.target.innerHTML.toLowerCase()}`);
      setIsActive("giving");
    } else if (
      e.target.innerHTML.toLowerCase() == "the sgf" &&
      isActive != "the sgf"
    ) {
      setIsActive("about");
      router.push("/about/the_sgf");
    } else if (
      e.target.innerHTML.toLowerCase() == "the point man" &&
      isActive != "the point man"
    ) {
      setIsActive("about");
      router.push("/about/the_point_man");
    } else {
      setIsActive(e.target.innerHTML.toLowerCase());
      router.push("/" + e.target.innerHTML.toLowerCase());
    }
  };

  useEffect(() => {
    if (process.browser) {
      setIsActive(location.pathname.split("/")[1]);
    }
  }, [process.browser && location.pathname]);

  return (
    <>
      <Head>
        <title>The Scripture Grace Foundation</title>
        <link rel="icon" href="/images/icon.png" type="image/png" />
        <meta name="robots" content="index, follow" />
      </Head>
      {isLaptop ? (
        <div className="nav-container">
          <div className="logo-container">
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div className="menu-container">
            <div
              onClick={handleClick}
              className={isActive == "" ? "active" : ""}
            >
              HOME
            </div>
            <div
              onClick={handleClick}
              className={isActive == "giving" ? "active" : ""}
            >
              GIVING
            </div>
            <div
              className={
                isActive == "sermons"
                  ? "dropdown-container  active"
                  : "dropdown-container"
              }
              onMouseOver={() => setShowCaretDownSermon(true)}
              onMouseLeave={() => setShowCaretDownSermon(false)}
              style={{ position: "relative", top: "0" }}
            >
              SERMONS
              {showCaretDownSermon ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
              <div className="dropdown">
                <div className="dropdown-background">
                  <div style={{ height: "100px" }}>
                    <div onClick={handleClick}>TEACHINGS</div>
                    <div onClick={handleClick}>VIDEOS</div>
                    <div onClick={handleClick}>PUBLICATIONS</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={handleClick}
              className={isActive == "evangelism" ? "active" : ""}
            >
              EVANGELISM REPORTS
            </div>
            <div
              className={
                isActive == "about"
                  ? "dropdown-container  active"
                  : "dropdown-container"
              }
              onMouseOver={() => setShowCaretDown(true)}
              onMouseLeave={() => setShowCaretDown(false)}
              style={{ position: "relative", top: "0" }}
            >
              ABOUT{" "}
              {showCaretDown ? <CaretUpOutlined /> : <CaretDownOutlined />}
              <div className="dropdown">
                <div className="dropdown-background">
                  <div>
                    <div onClick={handleClick}>THE POINT MAN</div>
                    <div onClick={handleClick}>THE SGF</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={handleClick}
              className={isActive == "contact" ? "active" : ""}
            >
              CONTACT
            </div>
          </div>
        </div>
      ) : (
        <div className="nav-container-mobile">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="logo-container">
              <img src="/images/logo.png" alt="logo" />
            </div>
            <div style={{ fontSize: 40, paddingRight: 10 }}>
              <div
                style={{ height: "100%" }}
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? <CloseOutlined /> : <MenuOutlined />}
              </div>
            </div>
          </div>
          {showMenu && (
            <div className="menu-container-mobile">
              <div
                onClick={handleClick}
                className={isActive == "" ? "active" : ""}
              >
                HOME
              </div>
              <div
                onClick={handleClick}
                className={isActive == "giving" ? "active" : ""}
              >
                GIVING
              </div>
              <div
                className={
                  isActive == "sermons"
                    ? "dropdown-container  active"
                    : "dropdown-container"
                }
                onClick={() => setShowCaretDownSermon(!showCaretDownSermon)}
                style={{ position: "relative", top: "0" }}
              >
                SERMONS
                {showCaretDownSermon ? (
                  <CaretUpOutlined />
                ) : (
                  <CaretDownOutlined />
                )}
                {showCaretDownSermon && (
                  <div className="dropdown">
                    <div className="dropdown-background">
                      <div style={{ height: "100px" }}>
                        <div onClick={handleClick}>TEACHINGS</div>
                        <div onClick={handleClick}>VIDEOS</div>
                        <div onClick={handleClick}>PUBLICATIONS</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={handleClick}
                className={isActive == "evangelism" ? "active" : ""}
              >
                EVANGELISM REPORTS
              </div>
              <div
                className={
                  isActive == "about"
                    ? "dropdown-container  active"
                    : "dropdown-container"
                }
                onClick={() => setShowCaretDown(!showCaretDown)}
                style={{ position: "relative", top: "0" }}
              >
                ABOUT{" "}
                {showCaretDown ? <CaretUpOutlined /> : <CaretDownOutlined />}
                {showCaretDown && (
                  <div className="dropdown">
                    <div className="dropdown-background">
                      <div>
                        <div onClick={handleClick}>THE POINT MAN</div>
                        <div onClick={handleClick}>THE SGF</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={handleClick}
                className={isActive == "contact" ? "active" : ""}
              >
                CONTACT
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default TopNav;
