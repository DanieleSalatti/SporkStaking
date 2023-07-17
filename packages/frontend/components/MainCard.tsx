import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { CgDollar } from "react-icons/cg";
import { useAccount } from "wagmi";
import sporkk from "../assets/sporkk.png";
import { AddressViewer, Faucet } from "../components/scaffold-eth";
import { Staker } from "./Staker";

const MainCard: FC = () => {
  // const { chain } = useNetwork();

  /*
  const sporkAddress =
    chain?.id === 137 ? "0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39" : "0xEC27eB34b7125B93CbDEF0C6A6E9fcA04b321f99";
  const stakedSporkAddress =
    chain?.id === 137 ? "0x9C2A7aC762ea6E33cfc380A5C802919b496c9e44" : "0xF4111E3784B607B83a6e3371490295bD2416c384";
  const sporkStakerAddress =
    chain?.id === 137 ? "0x195acfcF9f06e43410a3ad177665F358E659cDA6" : "0x7E6701b6116C2D3881A9e0D67aC84dFD75B95Ba9";
  */

  const sporkAddress = "0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39";
  const stakedSporkAddress = "0x3e356BC667DA320824b9AF5eC5B5ce3edaEbF754";
  const sporkStakerAddress = "0xAC6efAd5443280b1E5D93F5bfe076a7Ce6e448De";

  const [unstake, setUnstake] = useState<boolean>(false);

  const { isConnected } = useAccount();
  return (
    <motion.div
      initial={{
        y: -500,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        y: -20,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      {/* Navigation buttons */}
      <div className="flex mb-5 flex-row space-x-4 items-center justify-center">
        <button
          onClick={() => {
            setUnstake(false);
          }}
          disabled={!unstake}
          className="text-sm uppercase active:text-purple-400 hover:text-purple-400"
        >
          Stake
        </button>
        <button
          onClick={() => {
            setUnstake(true);
          }}
          disabled={unstake}
          className="text-sm uppercase active:text-purple-400 hover:text-purple-400"
        >
          Unstake
        </button>
      </div>
      {/* Nav buttons end and MainCard start */}

      <div className="py-10 px-3 rounded-xl border shadow-2xl bg-black border-gray-800 overflow-x-hidden">
        <h5 className="mb-2 text-gray-500 text-2xl tracking-widest flex justify-center uppercase items-center font-bold">
          <CgDollar style={{ color: "#52c41a" }} />
          Spork
        </h5>

        <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 items-center justify-center mt-4">
          {!isConnected && (
            <div className="flex justify-center">
              <Image src={sporkk} alt={"spork"} width={200} height={200} />
            </div>
          )}
          {isConnected && (
            <div className="flex flex-col">
              <Staker
                unstake={unstake}
                sporkAddress={sporkAddress}
                stakedSporkAddress={stakedSporkAddress}
                sporkStakerAddress={sporkStakerAddress}
              />
              <div className="flex flex-col items-center">
                <Link
                  href="https://ethden.page.link/membership"
                  target={"_blank"}
                  className="inline-flex items-center text-blue-600 hover:underline"
                  rel="noreferrer"
                >
                  SporkDAO membership agreement
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </Link>
                <div className="py-7 text-center text-md lg:flex lg:flex-col text-gray-500">
                  <p className="">
                    Please note: <br />
                    Switch to the Polygon Network. <br />
                    You will need to sign two transactions
                    <br /> to complete staking / unstaking.
                  </p>
                  <p className="mt-12 text-center">
                    To add staked spork (sSPORK) to your tokens
                    <br /> in your wallet
                    <br /> - add{" "}
                    <a
                      className="underline"
                      href="https://ethden.page.link/stakingHelp"
                      target="_blank"
                      rel="noreferrer"
                    >
                      staked spork
                    </a>{" "}
                    contract
                    <AddressViewer address={stakedSporkAddress} /> to your wallet.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <Faucet />
        </div>
      </div>
    </motion.div>
  );
};

export default MainCard;
