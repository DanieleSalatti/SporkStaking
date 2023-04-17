import React from "react";
import { motion } from "framer-motion";
import Spork from "../assets/spork.png";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  return (
    <header className="sticky top-0 p-5 border-b shadow-2xl border-zinc-700  border-opacity-60 bg-black bg-opacity-80 flex justify-between max-w-screen mx-0 z-20">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: -20,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="flex flex-row space-x-2 p-2 px-7 items-center"
      >
        <Image src={Spork} alt={"logo"} width={30} height={30} className="w-16 h-16 lg:w-30 lg:h-30" />
      </motion.div>

      <motion.div
        initial={{
          x: 70,
          opacity: 0,
          scale: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 1.5 }}
        className=" text-gray-300 cursor-pointer"
      >
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={false}
          chainStatus={{
            smallScreen: "icon",
            largeScreen: "icon",
          }}
        />
      </motion.div>
    </header>
  );
}

export default Header;
