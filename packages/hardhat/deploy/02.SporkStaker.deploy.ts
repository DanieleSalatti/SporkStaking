import { deployments } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { THardhatRuntimeEnvironmentExtended } from "helpers/types/THardhatRuntimeEnvironmentExtended";

import { TestSPORK } from "~common/generated/contract-types";
const { ethers, upgrades } = require("hardhat");

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const { get } = deployments;
  // Get the Contract Factory
  const SporkStaker = await ethers.getContractFactory("SporkStaker");

  // TODO: check chain id and use the correct address
  const chainId = await hre.getChainId();

  let sporkAddress = "0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39";
  if (chainId === "80001") {
    const SPORK: TestSPORK = await ethers.getContract("TestSPORK", deployer);
    sporkAddress = SPORK.address;
  }

  const sspork = await get("StakedSPORK");

  /*
  const StakedSPORK = await ethers.getContractAt(
    "StakedSPORK",
    sspork.address,
    deployer
  ); 
  */

  const StakedSPORKFactory = await ethers.getContractFactory("StakedSPORK");

  const StakedSPORK = StakedSPORKFactory.attach(sspork.address);

  const staker = await upgrades.deployProxy(
    SporkStaker,
    [sporkAddress, StakedSPORK.address],
    {
      // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
      from: deployer,
      initializer: "initialize",
      log: true,
    }
  );

  await staker.deployed();

  console.log("SporkStaker deployed to:", staker.address);

  await StakedSPORK.addMinter(staker.address);
};
export default func;
func.tags = ["SporkStaker"];
