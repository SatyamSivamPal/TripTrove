import "./globals.css";
import { Metadata } from "next";

import { Nunito } from "next/font/google";
import {Roboto} from"next/font/google";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

import RentModal from "./components/modal/RentModal";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";

import ToastProvider from "./providers/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modal/SearchModal";

export const metadata: Metadata = {
  title: "Triptrove",
  description: "Hotel Booking",
};

const font = Roboto({
  weight:'400',
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head />
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28 ">
          {children}
        </div>
      </body>
    </html>
  );
}
