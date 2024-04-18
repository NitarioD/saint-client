import { useRouter } from "next/router";
import Card from "../components/homePageCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Iframe from "react-iframe";
import Head from "next/head";
import truncateWordCount from "../helperFunctions/truncateWordCount";
import capitalise from "../helperFunctions/capitalise";

const Home = () => {
  const router = useRouter();
  const [homeDetails, setHomeDetails] = useState({});
  const [recents, setRecents] = useState({
    video: {
      link: "",
      description: "",
    },
    article: {
      title: "",
      content: "",
      imageURL: "",
    },
  });

  useEffect(() => {
    const getHomeDetails = async () => {
      const { data } = await axios.get("/base_page/home");
      if (data.homeDetails) {
        setHomeDetails(data.homeDetails.home);
      }
    };
    if (!homeDetails.header?.h1) {
      getHomeDetails();
    }
  }, [homeDetails]);

  useEffect(() => {
    const getRecentVideo = async () => {
      const { data } = await axios.get("/video/recent");
      setRecents({
        ...recents,
        video: {
          link: data.link,
          description: data.description,
        },
      });
    };

    //post to show under recents
    const getRecentPost = async () => {
      const { data } = await axios.get("/post/recent");
      const imageURL = data.content.split('src="')[1]?.split('">')[0];
      const title = data.content.split("<h1>")[1].split("</h1>")[0];
      const content = data.content.split("<p>")[1]?.split("</p>")[0];
      if (imageURL) {
        setRecents({
          ...recents,
          article: {
            title,
            content,
            imageURL,
          },
        });
      } else {
        setRecents({
          ...recents,
          article: {
            title,
            content,
          },
        });
      }
    };

    if (!recents.article.title) getRecentPost();
    if (!recents.video.link) getRecentVideo();
  }, [recents]);

  //load an image as homepage banner
  useEffect(() => {
    if (homeDetails.banner_img) {
      if (process.browser) {
        document.getElementById(
          "banner"
        ).style.backgroundImage = `url("${process.env.NEXT_PUBLIC_API}/image/${homeDetails.banner_img}")`;
      }
    }
  }, [process.browser && homeDetails]);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people, the poor and the rich. We need your support to function effectively. You can join our membership at any time"
        />
        <meta
          name="keywords"
          content="support, non-profit, Jesus Christ, evangelism, scripture grace foundation, membership"
        />
      </Head>
      <div className="home-container">
        <section className="header">
          <div className="banner" id="banner">
            <h1>{homeDetails?.header?.h1}</h1>
            <p>{homeDetails?.header?.p}</p>
            <div>
              <button onClick={() => router.push("/about/the_sgf")}>
                ABOUT US
              </button>
            </div>
          </div>
        </section>
        <section className="welcome">
          <h2>{homeDetails?.welcome?.h2}</h2>
          <p>{homeDetails?.welcome?.p}</p>
          <div className="card-container">
            {homeDetails?.cards?.map((card) => (
              <Card
                key={card._id}
                h3={card.h3}
                p={card.p}
                button={card.button}
              />
            ))}
          </div>
        </section>

        <section className="activities">
          <h2>
            <span>{homeDetails?.support?.h2}</span>
          </h2>
          <h3>{homeDetails?.support?.h3}</h3>
          <div className="content">
            <div>
              <h3>{homeDetails?.support?.financial.h3}</h3>
              <p>{homeDetails?.support?.financial.p}</p>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <button onClick={() => router.push("/giving")}>
                  DONATE
                  <img src="/images/give_money.png" alt="giving image" />
                </button>
              </div>
            </div>
            <div>
              <h3>{homeDetails?.support?.prayer.h3}</h3>
              <p>{homeDetails?.support?.prayer.p}</p>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <button onClick={() => router.push("/user/subscribe")}>
                  JOIN <img src="/images/add.svg" alt="join image" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="recents">
          <h2>Recents</h2>
          <div className="content">
            <div>
              <h3>Recent Article</h3>
              <h4
                style={{
                  borderBottom: "1px solid black",
                  marginBottom: "5px",
                  color: "white",
                }}
              >
                {recents.article.title && capitalise(recents.article.title)}
              </h4>
              {recents.article.imageURL && (
                <img
                  src={recents.article.imageURL}
                  alt="recent publication image"
                />
              )}
              <span>
                {recents.article.content &&
                  truncateWordCount(recents.article.content, 350)}
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    position: "absolute",
                    bottom: 0,
                    right: "25px",
                  }}
                >
                  <i>...See publications</i>
                </span>
              </span>
            </div>
            <div>
              <h3>Recent Teaching</h3>
              <Iframe
                url={recents.video.link}
                width="100%"
                height="290px"
                className=""
                display="block"
                position="relative"
              />
              <span>
                <h4>Description</h4>
                <p>
                  {recents.video.description
                    ? truncateWordCount(recents.video.description, 100)
                    : "..."}
                </p>
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    position: "absolute",
                    bottom: 0,
                    bottom: 0,
                    right: "25px",
                  }}
                >
                  <i>...See teachings</i>
                </span>
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
