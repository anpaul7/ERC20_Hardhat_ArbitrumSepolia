import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20_HardHat", function () {

  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("ERC20_HardHat");

    const initialOwner = (await ethers.getSigners())[0].address;

    const instance = await ContractFactory.deploy(initialOwner);
    await instance.waitForDeployment();

    expect(await instance.name()).to.equal("ERC20_HardHat");
  });


  it("Deploy transaction token contract", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const ERC20_HardHat = await ethers.getContractFactory("ERC20_HardHat");
    const prueba = await ERC20_HardHat.deploy(owner.address);

    // Transaction confirmation
    await prueba.deploymentTransaction();

    const mintAmount = ethers.parseUnits("1000", 18); 
    await prueba.mint(addr1.address, mintAmount);
    const balance = await prueba.balanceOf(addr1.address);
    expect(balance).to.equal(mintAmount);
    
  });

});