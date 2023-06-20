import { formatEther, parseEther } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { FC, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import Notiflix from "notiflix";
import { CountryDropdown } from "react-country-region-selector";
import IERC20MintableBurnableABI from "~~/abis/IERC20MintableBurnable.json" assert { type: "json" };
import SporkStakerABI from "~~/abis/SporkStaker.json" assert { type: "json" };

export interface IStakerProps {
  unstake: boolean;
  sporkAddress: string;
  stakedSporkAddress: string;
  sporkStakerAddress: string;
}

export const Staker: FC<IStakerProps> = props => {
  const { unstake, sporkAddress, stakedSporkAddress, sporkStakerAddress } = props;
  const { address, isConnected } = useAccount();

  const [sporkToStake, setSporkToStake] = useState<BigNumber>(BigNumber.from(0));
  const [sporkToUnStake, setSporkToUnStake] = useState<BigNumber>(BigNumber.from(0));
  const [member, setMember] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(true);

  const { chain } = useNetwork();

  useEffect(() => {
    fetch(`/api/member/hasStaked/${address}`)
      .then(res => res.json())
      .then(data => {
        console.log("DASA", data);
        if (data.exists) {
          console.log("DASA member found");
          setShowForm(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [address]);

  const handleSubmit = async (block_number: number) => {
    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      country,
      wallet: address,
      amount: sporkToStake,
      block_number,
    };
    try {
      const response = await fetch("/api/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  /*** SPORK MINTING ****/

  const { config: mintConfig } = usePrepareContractWrite({
    address: sporkAddress,
    abi: IERC20MintableBurnableABI,
    functionName: "mint",
    args: [address, parseEther("100")],
  });

  const { write: mintSporks, isLoading: mintLoading } = useContractWrite({
    ...mintConfig,
    abi: IERC20MintableBurnableABI,
  });

  /*** SPORK TRANSFER APPROVAL ****/

  const { config: approveConfig } = usePrepareContractWrite({
    address: sporkAddress,
    abi: IERC20MintableBurnableABI,
    functionName: "approve",
    args: [sporkStakerAddress, sporkToStake],
  });

  const { data: approvalData, write: approveSporksTransfer } = useContractWrite({
    ...approveConfig,
    abi: IERC20MintableBurnableABI,
  });

  const {
    isLoading: isApprovalLoading,
    // isSuccess: isApprovalSuccess
  } = useWaitForTransaction({
    hash: approvalData?.hash,
    confirmations: 5,
    onSettled(data, error) {
      console.log("Approved Settled wait", { data, error });
      if (!stakeSporks) {
        console.log("Stake sporks failed");
      }
      stakeSporks?.();
    },
    onSuccess(data) {
      console.log("Approved Success wait", { data });
    },
  });

  /*** SPORK STAKING ****/

  const {
    write: stakeSporks,
    isLoading: stakingLoading,
    isError: stakingError,
    error: stakingErrorMsg,
    isSuccess: stakingSuccess,
    data: stakingTransactionData,
  } = useContractWrite({
    // ...stakeConfig,
    abi: SporkStakerABI,
    address: sporkStakerAddress,
    functionName: "stake",
    args: [sporkToStake],
    mode: "recklesslyUnprepared",
  });

  useEffect(() => {
    if (stakingError) {
      Notiflix.Notify.failure(`Transaction Error: ${stakingErrorMsg?.message}`);
    }
    if (stakingSuccess) {
      Notiflix.Notify.success(`Transaction successful!: ${JSON.stringify(stakingTransactionData)}`);
      setSporkToStake(BigNumber.from(0));
      setSporkToUnStake(BigNumber.from(0));
      stakingTransactionData?.wait(2).then(receipt => {
        console.log("receipt", receipt);
        handleSubmit(receipt.blockNumber);
      });
    }
  }, [stakingError, stakingSuccess, stakingTransactionData, stakingErrorMsg?.message]);

  /*** STAKED SPORK TRANSFER APPROVAL ****/

  const { config: stakedApproveConfig } = usePrepareContractWrite({
    address: stakedSporkAddress,
    abi: IERC20MintableBurnableABI,
    functionName: "approve",
    args: [sporkStakerAddress, sporkToUnStake],
  });

  const { data: stakedApprovalData, write: approveStakedSporksTransfer } = useContractWrite({
    ...stakedApproveConfig,
    abi: IERC20MintableBurnableABI,
  });

  const {
    isLoading: isStakedApprovalLoading,
    // isSuccess: isStakedApprovalSuccess
  } = useWaitForTransaction({
    hash: stakedApprovalData?.hash,
    confirmations: 5,
    onSettled(data, error) {
      console.log("Approved Settled wait", { data, error });
      if (!unstakeSporks) {
        console.log("Unstake sporks failed");
      }
      unstakeSporks?.();
    },
    onSuccess(data) {
      console.log("Approved Success wait", { data });
    },
  });

  /*** SPORK UNSTAKING ****/

  const {
    write: unstakeSporks,
    isLoading: unstakingLoading,
    isError: unstakingError,
    isSuccess: unstakingSuccess,
    error: unstakingErrorMsg,
    data: unstakingTransactionData,
  } = useContractWrite({
    // ...unstakeConfig,
    abi: SporkStakerABI,
    address: sporkStakerAddress,
    functionName: "unstake",
    args: [sporkToUnStake],
    mode: "recklesslyUnprepared",
  });

  useEffect(() => {
    if (unstakingError) {
      Notiflix.Notify.failure(`Transaction Error: ${unstakingErrorMsg?.message}`);
    }
    if (unstakingSuccess) {
      Notiflix.Notify.success(`Transaction Successful!:${JSON.stringify(unstakingTransactionData)}`);
      setSporkToStake(BigNumber.from(0));
      setSporkToUnStake(BigNumber.from(0));
      stakingTransactionData?.wait(2).then(receipt => {
        console.log("receipt", receipt);
        handleSubmit(receipt.blockNumber);
      });
    }
  }, [unstakingError, unstakingSuccess, unstakingTransactionData, unstakingErrorMsg?.message]);

  /*** BALANCE READERS ***/

  const { data } = useContractReads({
    contracts: [
      {
        address: sporkAddress,
        abi: IERC20MintableBurnableABI,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: stakedSporkAddress,
        abi: IERC20MintableBurnableABI,
        functionName: "balanceOf",
        args: [address],
      },
    ],
    watch: true,
  });

  useEffect(() => {
    if (data && BigNumber.from(data[1]).gt(0)) {
      setMember(true);
    }
  }, [data]);

  async function mintSPORK(): Promise<void> {
    mintSporks && mintSporks();
  }

  async function stakeSPORK(): Promise<void> {
    try {
      approveSporksTransfer && approveSporksTransfer();
    } catch (err) {
      console.log(err);
    }
  }

  async function unstakeSPORK(): Promise<void> {
    try {
      approveStakedSporksTransfer && approveStakedSporksTransfer();
    } catch (err) {
      console.log(err);
    }
  }

  if (!isConnected) {
    return <div>Connect Wallet</div>;
  }

  // Check that user has confirmed SPORKDAO membership to enable/disable stake button
  function memberCheck(): void {
    const checkbox = document.getElementById("check") as HTMLInputElement;
    checkbox?.addEventListener("change", isMember);

    function isMember(this: HTMLElement, ev: Event) {
      ev.preventDefault();
      setMember(checkbox?.checked);
    }
  }
  void memberCheck();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 text-center text-slate-200">
      <div className="flex flex-col items-center">
        {/* Read SPORK and sSPORK balances */}
        <div className="stat flex flex-row space-x-3 justify-center">
          <div className="text-left p-6 tracking-widest w-[130px] lg:w-auto overflow-auto  bg-gray-800 bg-opacity-50 rounded-2xl">
            <p className="uppercase text-xs tracking-widest">
              SPORK
              <br /> Balance
            </p>
            <p className="text-3xl md:text-5xl text-white font-semibold">
              {data && formatEther(data[0] ? BigNumber.from(data[0]) : 0)}
            </p>
          </div>
          <div className="text-left p-6 tracking-widest w-[130px] lg:w-auto overflow-auto bg-gray-800 bg-opacity-50 rounded-2xl">
            <p className="text-xs tracking-widest">
              sSPORK
              <br /> BALANCE
            </p>
            <p className=" text-3xl md:text-5xl text-white font-semibold">
              {data && formatEther(data[1] ? BigNumber.from(data[1]) : 0)}
            </p>
          </div>
        </div>
        {/* Read SPORK and sSPORK balances end */}
        {!unstake && (
          <>
            <button
              className={chain!.id === 137 ? "hidden" : "stakeButton"}
              onClick={(): void => {
                void mintSPORK();
              }}
            >
              {mintLoading ? (
                <AiOutlineLoading3Quarters className="spinner-border animate-spin" />
              ) : (
                "Mint testnet SPORK"
              )}
            </button>
            <div className="flex w-full flex-col mt-4">
              {!member && (
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">I plan to or have applied to attend ETHDenver and join SPORKDAO</span>
                    <input type="checkbox" id="check" className="checkbox checkbox-primary ml-4" />
                  </label>
                </div>
              )}

              {member && (
                <div className="flex flex-col">
                  <div className={`${!showForm ? "hidden" : ""}`}>
                    <div className="flex flex-col pt-5">
                      <label htmlFor="sporkToStake" className="text-xs text-left uppercase  text-gray-500">
                        First Name
                      </label>
                      <input
                        type="text"
                        onChange={(e): void => setFirstName(e.target.value)}
                        className="px-5 py-3 mt-4 bg-transparent outline-none border border-gray-500 rounded"
                      />
                    </div>
                    <div className="flex flex-col pt-5">
                      <label htmlFor="sporkToStake" className="text-xs text-left uppercase  text-gray-500">
                        Last Name
                      </label>
                      <input
                        type="text"
                        onChange={(e): void => setLastName(e.target.value)}
                        className="px-5 py-3 mt-4 bg-transparent outline-none border border-gray-500 rounded"
                      />
                    </div>
                    <div className="flex flex-col pt-5">
                      <label htmlFor="sporkToStake" className="text-xs text-left uppercase  text-gray-500">
                        Email
                      </label>
                      <input
                        type="text"
                        onChange={(e): void => setEmail(e.target.value)}
                        className="px-5 py-3 mt-4 bg-transparent outline-none border border-gray-500 rounded"
                      />
                    </div>
                    <div className="flex flex-col pt-5">
                      <label htmlFor="sporkToStake" className="text-xs text-left uppercase  text-gray-500">
                        Country of Residence
                      </label>
                      <CountryDropdown
                        value={country}
                        onChange={val => setCountry(val)}
                        style={{
                          padding: "13px 5px",
                          marginTop: "4",
                          backgroundColor: "transparent",
                          outline: "none",
                          border: "1px solid #9CA3AF",
                          borderRadius: "0.375rem",
                        }}
                      />
                    </div>
                    <div className="flex flex-col pt-5">
                      <label htmlFor="sporkToStake" className="text-xs text-center text-gray-500">
                        Entering incorrect information will result in making you ineligible for DAO benefits. You are
                        allowed to register multiple wallets to your membership email.
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col pt-5">
                    <label htmlFor="sporkToStake" className="text-xs text-left uppercase  text-gray-500">
                      Amt of Spork to stake
                    </label>
                    <input
                      type="number"
                      onChange={(e): void => setSporkToStake(parseEther(e.target.value))}
                      className="px-5 py-3 mt-4 bg-transparent outline-none border border-gray-500 rounded"
                    />
                  </div>
                  <button
                    onClick={async (): Promise<void> => {
                      await void stakeSPORK();
                    }}
                    className="stakeButton flex justify-center"
                    disabled={!data || sporkToStake.gt(BigNumber.from(data[0]))}
                  >
                    {isApprovalLoading || stakingLoading ? (
                      <AiOutlineLoading3Quarters className="spinner-border items-center animate-spin" />
                    ) : (
                      "Stake SPORK"
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {unstake && (
          <div className="flex w-full flex-col mt-4">
            <label htmlFor="sporkToUnStake" className="text-xs text-left uppercase  text-gray-500">
              Amount to unstake
            </label>
            <input
              type="number"
              onChange={(e): void => setSporkToUnStake(parseEther(e.target.value))}
              className="px-5 py-3 mt-4 bg-transparent outline-none border border-gray-500 rounded"
            />
            <button
              onClick={(): void => {
                void unstakeSPORK();
              }}
              className="stakeButton flex justify-center"
              disabled={!data || sporkToUnStake.gt(BigNumber.from(data[1]))}
            >
              {isStakedApprovalLoading || unstakingLoading ? (
                <AiOutlineLoading3Quarters className="spinner-border animate-spin" />
              ) : (
                "Unstake SPORK"
              )}{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
