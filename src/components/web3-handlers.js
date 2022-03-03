// TODO refactor to propper module which has constructor, methods etc.
import { tbtkNftJson } from "../contract/tbtk-nft-config";
import { ethers } from "ethers";

var contract;

/**
 * Checks if metamask installed in browser
 * @returns bool
 */
function checkMetamask() {
  console.log("Checking metamask");

  if (typeof window.ethereum !== "undefined") {
    console.log("Metamask installed");

    return true;
  } else {
    console.log("Metamask not installed");
    return false;
  }
}

/**
 * Returns users account
 * @returns string
 */
async function requestAccount() {
  let account = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return account;
}

/**
 * Creates contract instance and assin
 * @returns void
 */
async function loadTbtkNftContact(contractAddress) {
  console.log("Loading contract");
  // TODO error checking
  // TODO check ethers properly installed
  // TODO check contract properly initiated

  // Get abi from local js module
  let contractAbi = tbtkNftJson.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();

  // Assing return contract
  contract = new ethers.Contract(contractAddress, contractAbi, signer);
}

/**
 *
 * @param {string} address
 * @param {string} nftMetadataUri
 * @returns {Object}
 */
async function payToMintNft(address, nftMetadataUri) {
  console.log("Minting NFT");

  // Returns this object
  let resultObject = {
    result: true,
    message: "Nft minted succesfully",
    txHash: null,
    image: "",
    metada: "",
  };

  try {
    const options = { value: ethers.utils.parseEther("0.05") };
    let tx = await contract.payToMint(address, nftMetadataUri, options);
    resultObject.txHash = tx.hash;

    //need to upload nft to the ipfs network

    const uploadToIpfsNode = async () => {};

    return resultObject;
  } catch (e) {
    console.log("PayToMintNft error");
    alert("Not Enought Ethereum!!!");
    resultObject.result = false;
    resultObject.message = e.data.message;
    return resultObject;
  }
}

export {
  checkMetamask,
  requestAccount,
  loadTbtkNftContact,
  payToMintNft,
  contract,
};
