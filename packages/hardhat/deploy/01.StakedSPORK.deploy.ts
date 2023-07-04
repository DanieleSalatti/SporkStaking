import { deployments } from "hardhat";
import { DeployFunction, ExtendedArtifact } from "hardhat-deploy/types";
import { THardhatRuntimeEnvironmentExtended } from "helpers/types/THardhatRuntimeEnvironmentExtended";
const { ethers, upgrades } = require("hardhat");

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { save } = deployments;

  const StakedSPORK = await ethers.getContractFactory("StakedSPORK");

  const sspork = await upgrades.deployProxy(StakedSPORK, {
    from: deployer,
    log: true,
  });

  await sspork.deployed();
  console.log("StakedSpork deployed to:", sspork.address);

  const artifact = await deployments.getExtendedArtifact("StakedSPORK");

  let proxyDeployments = {
    address: sspork.address,
    ...(artifact as ExtendedArtifact),
  };

  await save("StakedSPORK", proxyDeployments);
};
export default func;
func.tags = ["StakedSPORK"];
