import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InstallBootstrap from "@/components/InstallBootstrap";
import QueryClientContextProvider from "./QueryClientContextProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Head from "@/components/UI/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  metadataBase: new URL('http://localhost:3002'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AntdRegistry>
        <QueryClientContextProvider>
          <InstallBootstrap />
          <body className={inter.className}>
             <Head/>
            
            {children}</body>
        </QueryClientContextProvider>
      </AntdRegistry>
    </html>
  );
}
