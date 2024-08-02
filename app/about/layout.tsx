import type { Metadata } from "next";
import { PostsProvider } from "@/contexts";

export const metadata: Metadata = {
  description:
    "The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people, the poor and the rich. Learn about spiritual truths",
};

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PostsProvider>{children}</PostsProvider>;
}
