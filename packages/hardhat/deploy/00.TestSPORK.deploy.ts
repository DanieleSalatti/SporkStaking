import { DeployFunction } from "hardhat-deploy/types";
import { THardhatRuntimeEnvironmentExtended } from "helpers/types/THardhatRuntimeEnvironmentExtended";

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = await hre.getChainId();
  if (chainId === "137") return;

  await deploy("TestSPORK", {
    from: deployer,
    log: true,
  });
};
export default func;
func.tags = ["TestSPORK"];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
