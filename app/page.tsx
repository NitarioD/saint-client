"use client";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import useInterval from "@/helperFunctions/interval";
import { FaBuffer } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BasicContentContext } from "@/contexts";
import { useEffect, useState, useContext, useLayoutEffect } from "react";
import { ShowCard } from "@/components/ui/show-card";
import { CarouselSlider } from "@/components/ui/carousel-slider";

const Home = () => {
  const [details, setDetails] = useContext(BasicContentContext);

  const [progress, setProgress] = useState(0);
  const [milliseconds, setmilliseconds] = useState(0);

  const [homeDetails, setHomeDetails] = useState({
    header: {
      h1: "",
      p: "",
    },
    banner_img: "",
    welcome: {
      h2: "",
      p: "",
    },
    cards: [{ _id: "", h3: "", p: "", button: "" }],
    support: {
      h2: "",
      h3: "",
      financial: { h3: "", p: "" },
      prayer: { h3: "", p: "" },
    },
  });
  useEffect(() => {
    if (!homeDetails.header.h1) {
      setmilliseconds(1000);
    } else {
      setmilliseconds(0);
    }
  }, [homeDetails]);

  useInterval(() => {
    if (progress <= 98) {
      setProgress(progress + 1);
    }
  }, milliseconds);

  //get data to render
  useLayoutEffect(() => {
    if (details.home && !homeDetails.header.h1) {
      setHomeDetails(details.home);
    }
  }, [details, homeDetails.header.h1]);
  return (
    <>
      {homeDetails.header.h1 ? (
        <div className="home-container">
          <section id="header">
            <div className="relative">
              <div className="h-[600px] sm:h-[350px] sm:mb-[10px]">
                {homeDetails?.banner_img && (
                  <Image
                    width={10000}
                    height={0}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/image/${homeDetails.banner_img}`}
                    className="object-cover h-[600px] sm:h-[400px] w-full"
                    alt="background image"
                  />
                )}
              </div>
              <div className="absolute z-3 sm:inset-x-[8vw] sm:top-[20px] inset-x-[18vw] md:top-[150px] top-[300px] bg-black/[0.75] text-white rounded-lg p-10 text-justify">
                <h1 className="sm:text-[18px] sm:font-[600] text-[31px] font-[800] text-center">
                  {homeDetails?.header?.h1}
                </h1>
                <p className="lg:text-lg md:text-lg">
                  {homeDetails?.header?.p}
                </p>
                <div className="flex justify-center mt-5">
                  <Link href={"/about/the-sgf"} legacyBehavior passHref>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="lg:text-lg md:text-lg"
                    >
                      ABOUT
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section id="welcome" className="flex flex-col gap-5 p-10">
            <h2 className="text-[1.5rem] text-center">
              {homeDetails?.welcome?.h2}
            </h2>
            <p className="text-justify  lg:text-[1.1rem]">
              {homeDetails?.welcome?.p}
            </p>
            <div className="flex sm:flex-col flex-row gap-5 justify-center items-stretch">
              {homeDetails?.cards?.map((card) => (
                <ShowCard
                  key={card._id}
                  h3={card.h3}
                  p={card.p}
                  button={card.button}
                />
              ))}
            </div>
          </section>

          <section
            id="activities"
            className="bg-cyan-950 p-10 before:content-[''] relative"
          >
            <div className="before:content-[''] before:absolute before:bg-white before:top-0 before:left-0 before:w-5 before:h-10" />
            <div className="after:content-[''] after:absolute after:bg-white after:top-0 after:right-0 after:w-5 after:h-10" />

            <div className="text-white mb-8">
              <div className="flex gap-6">
                <h2 className="text-[30px] bg-black/[0.75] rounded-md text-center mb-5 md:w-[50%] lg:w-[50%] px-5">
                  {homeDetails?.support?.h2}
                </h2>
                <h3 className="lg:text-[1.1rem]">{homeDetails?.support?.h3}</h3>
              </div>
            </div>
            <div>
              <Card className="p-5 bg-black/[0.75]">
                <CardHeader className="text-white font-[600] text-[24px] ">
                  {homeDetails?.support?.financial.h3}
                </CardHeader>
                <CardDescription className="text-justify lg:text-lg md:text-lg">
                  {homeDetails?.support?.financial.p}
                </CardDescription>
                <div className="flex justify-center">
                  <Link href={"/giving"} legacyBehavior passHref>
                    <Button className="flex gap-4 mt-5 hover:text-[1em] w-[200px]">
                      <Image
                        width={100}
                        height={0}
                        src="/images/give_money.png"
                        alt="giving image"
                        className="w-[30px]"
                      />{" "}
                      DONATE
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
            <div className="relative">
              <Card className="p-5 bg-black/[0.75] mt-6">
                <CardHeader className="text-white font-[600] text-[24px] ">
                  {homeDetails?.support?.prayer.h3}
                </CardHeader>
                <CardDescription className="text-justify lg:text-lg md:text-lg">
                  {homeDetails?.support?.prayer.p}
                </CardDescription>
                <div className="flex justify-center">
                  <Link href={"/user/subscribe"} legacyBehavior passHref>
                    <Button className="flex gap-4 mt-5 hover:text-[1em] w-[200px]">
                      <Image
                        src="/images/add.svg"
                        alt="join image"
                        width={100}
                        height={0}
                        className="w-[30px]"
                      />{" "}
                      JOIN
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
            <div className="before:content-[''] before:absolute before:bg-white before:bottom-0 before:left-0 before:w-5 before:h-10" />
            <div className="after:content-[''] after:absolute after:bg-white after:bottom-0 after:right-0 after:w-5 after:h-10" />
          </section>
          <section id="recents" className="mt-8">
            <h2 className="text-center text-[20px]"> Recent Activities</h2>
            <div className="flex justify-center items-center">
              <div className="border-b-2 border-cyan-950 w-[25%] rounded-[2px]" />
              <FaBuffer />
              <div className="border-b-2 border-cyan-950 w-[25%] rounded-[2px]" />
            </div>
            <div className="sm:flex sm:flex-col sm:justify-center sm:items-center">
              <div className="my-[50px] sm:w-[93%]">
                <CarouselSlider display="videos" />
                <br />
                <CarouselSlider display="articles" />
              </div>
              <div></div>
            </div>
          </section>
        </div>
      ) : (
        <div className="min-h-[50vh] flex justify-center items-center">
          <Progress value={progress} />
        </div>
      )}
    </>
  );
};

export default Home;
