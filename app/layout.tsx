import type { Metadata } from "next";
import "./globals.css";
import "./tiptap.scss";
import { BasicContentProvider } from "@/contexts";

export const metadata: Metadata = {
  title: "The Scripture Grace Foundation",
  description:
    "The Scripture Grace Foundation is a non-profit organization that spreads the gospel about Jesus Christ to every people, the poor and the rich. We need your support to function effectively. You can join our membership at any time",
  robots: "index, follow",
  icons: { icon: "icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BasicContentProvider>{children}</BasicContentProvider>
      </body>
    </html>
  );
}
