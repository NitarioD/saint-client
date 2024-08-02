import * as React from "react";
import { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getVideos, getArticles } from "@/api/api_communications";
import { FaBookOpen } from "react-icons/fa";
import Image from "next/image";

type Props = {
  className?: string;
  display: "videos" | "articles";
};

export const CarouselSlider: React.FC<Props> = ({ className, ...props }) => {
  return <>{props.display === "videos" ? <Videos /> : <Articles />}</>;
};

const Videos: () => React.ReactNode = () => {
  const [recents, setRecents] = useState({
    videos: [],
  });

  useEffect(() => {
    const getRecents = async () => {
      const videos = await getVideos();
      setRecents({ videos });
    };

    if (!recents.videos[0]) {
      getRecents();
    }
  }, [recents]);

  return (
    <>
      <div className="flex justify-center">
        <Carousel className="w-[85%] sm:w-[80%]">
          <CarouselContent className="flex gap-4">
            {recents.videos.map(
              (video: { link: string; description: string }, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/2  "
                >
                  <Card className="bg-cyan-950 h-[100%]">
                    <CardContent className="flex  items-start justify-start p-0 gap-6 flex-col mb-5">
                      <Iframe
                        url={video.link}
                        className="h-[240px] sm:h-[auto] w-[100%]"
                        display="block"
                        position="relative"
                      />
                      <div>
                        <h4 className="px-3 text-white text-[1.1rem]">
                          Description
                        </h4>
                        <p className="line-clamp-3 px-3 text-justify text-[1 rem] text-gray-300">
                          {video.description ? video.description : "..."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

const Articles: () => React.ReactNode = () => {
  const [recents, setRecents] = useState({
    articles: [],
  });

  useEffect(() => {
    const getRecents = async () => {
      const articles = await getArticles();
      setRecents({ articles });
    };

    if (!recents.articles[0]) {
      getRecents();
    }
  }, [recents]);

  return (
    <>
      <div className="flex justify-center">
        <Carousel className="w-[85%] sm:w-[80%]">
          <CarouselContent className="flex gap-4 items-stretch">
            {recents.articles.map(
              (
                article: { title: string; content: string; category: string },
                index
              ) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="bg-cyan-950 h-[100%]">
                    <CardContent className="flex p-0 gap-6 flex-col mb-5">
                      <div>
                        {/* display imge if it exists */}
                        {article.content.split('src="')[1]?.split('">')[0] ? (
                          <Image
                            width={10000}
                            height={0}
                            src={
                              article.content.split('src="')[1]?.split('">')[0]
                            }
                            className="h-[250px] w-[100%]"
                            alt="article image"
                          />
                        ) : (
                          <div className="h-[250px] w- flex justify-center items-center">
                            <FaBookOpen className="text-[200px]" />
                          </div>
                        )}
                      </div>
                      <div className="max-h-[150px]">
                        <h1 className="text-white uppercase text-center text-bold">
                          {article.title}
                        </h1>
                        <p className="line-clamp-5 px-3 text-gray-400 text-justify">
                          {article.content.split("<p>")[1]?.split("</p>")[0]}
                          {article.content.split("<p>")[2]?.split("</p>")[0] &&
                            article.content.split("<p>")[2]?.split("</p>")[0]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};
