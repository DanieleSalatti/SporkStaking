import { DeployFunction } from "hardhat-deploy/types";
import { THardhatRuntimeEnvironmentExtended } from "helpers/types/THardhatRuntimeEnvironmentExtended";
const { ethers, upgrades } = require("hardhat");

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const StakedSPORK = await ethers.getContractFactory("StakedSPORK");

  await upgrades.deploy(StakedSPORK, {
    from: deployer,
    log: true,
  });
};
export default func;
func.tags = ["StakedSPORK"];
