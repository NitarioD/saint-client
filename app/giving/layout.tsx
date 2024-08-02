import type { Metadata } from "next";
export const metadata: Metadata = {
  description:
    "The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people. We need your support to function effectively.",
  keywords:
    "support, non-profit, Jesus Christ, evangelism, scripture grace foundation",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
