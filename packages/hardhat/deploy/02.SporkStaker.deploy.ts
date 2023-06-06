import { DeployFunction } from "hardhat-deploy/types";
import { THardhatRuntimeEnvironmentExtended } from "helpers/types/THardhatRuntimeEnvironmentExtended";

import { TestSPORK } from "~common/generated/contract-types";
const { ethers, upgrades } = require("hardhat");

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  // Get the Contract Factory
  const SporkStaker = await ethers.getContractFactory("SporkStaker");

  // TODO: check chain id and use the correct address
  const chainId = await hre.getChainId();

  let sporkAddress = "0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39";
  if (chainId === "80001") {
    const SPORK: TestSPORK = await ethers.getContract("TestSPORK", deployer);
    sporkAddress = SPORK.address;
  }

  const StakedSPORK = await ethers.getContract("StakedSPORK", deployer);

  const staker = await upgrades.deployProxy(SporkStaker, {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [sporkAddress, StakedSPORK.address],
    log: true,
  });

  await StakedSPORK.addMinter(staker.address);

  const StakerInstance = await ethers.getContract("SporkStaker", deployer);
};
export default func;
func.tags = ["SporkStaker"];
