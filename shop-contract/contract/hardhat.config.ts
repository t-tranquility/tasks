import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const INFURA_API_KEY = "4380aaa8e1d648709c60c4ecc9b933b0";
const SEPOLIA_PRIVATE_KEY = 'e9b58efb5a9bfcf0646bc4b5e1d591faa12b529013a18162db55a45c20cf420d';
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  etherscan:{
    apiKey: "GVIDKINBMRIDQFCT7VMDGFYWG9IN8ARUE2",
  },
  networks:{
    sepolia:{
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    }
  }
};

export default config;
