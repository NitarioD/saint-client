import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  className?: string;
  h3: string;
  p: string;
  button: string;
};

export const ShowCard: React.FC<Props> = ({ className, ...props }) => {
  const [linkto, setLinkTo] = useState("");

  useEffect(() => {
    if (props.h3 === "The Point Man") {
      setLinkTo("/about/the-point-man");
    } else if (props.h3 === "Our Publications") {
      setLinkTo("/posts/sermons/publications/1");
    } else if (props.h3 === "Our Membership") {
      setLinkTo("/user/subscribe");
    }
  }, [props.h3]);
  return (
    <Card
      className={cn(
        "lg:w-[380px] md:w-[380px] sm:w-[100%] text-justify",
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle>{props.h3}</CardTitle>
        <CardDescription className="lg:leading-10 md:leading-5 sm:leading-5 lg:text-[1.1rem] md:text-md">
          {props.p}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={linkto}>
          <Button className="w-full">{props.button}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
