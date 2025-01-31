import { run } from 'hardhat'
import { DeployFunction, DeployResult } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { networkConfig } from "../helper-hardhat-config";

const deployLock: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network} = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const currentTime: number = Math.floor(Date.now() / 1000 );
    const unlockTime: number = currentTime + 60;

    const args: any[] = [
        unlockTime,
    ];
    
    log("-----------------------------------");
    log("Deploying Lock...");

    const lock: DeployResult = await deploy("Lock", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    });
    
    // log("-----------------------------------");
    // log("Verifying Lock...");

    // await run("verify:verify", {
    //     address: lock.address,
    //     construtorArguments: args
    // });
}

export default deployLock;