// TODO refactor to propper module which has constructor, methods etc.
import { tbtkNftJson } from "../contract/tbtk-nft-config";
import { ethers } from "ethers";
import { NFTStorage, File } from "nft.storage";
import mime from "mime";
// import fs from "fs";
// import path from "path";

const NFT_STORAGE_KEY = "myKey";
const PRICE = "0.001";
var contract;

// TODO: yapilacaklar: fs ve path reactte calismiyor, bunlar nodejs/backend kutuphaneleri
// bunu hallet
// veriyi gonder

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
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
async function storeNFT(imagePath, name, email, description) {
  // const image = await fileFromPath(imagePath);
  const image = null;
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  return nftstorage.store({
    image,
    name,
    email,
    description,
  });
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
// async function fileFromPath(filePath) {
//   // const content = await fs.promises.readFile(filePath);
//   const content = filePath;
//   const type = mime.getType(filePath);
//   return new File([content], path.basename(filePath), { type });
// }

/**
 *
 * @param {string} address
 * @param {string} nftMetadataUri
 * @param {string} imgPath
 * @param {string} userName
 * @param {string} userEmail
 * @returns {Object}
 */
async function payToMintNft(
  address,
  nftMetadataUri,
  imgPath,
  userName,
  userEmail,
  userDescription
) {
  console.log("Minting NFT");

  // Returns this object
  let resultObject = {
    result: true,
    message: "Nft minted succesfully",
    txHash: null,
    metaData: "",
    // metada: "",
  };

  try {
    const options = { value: ethers.utils.parseEther(PRICE) };
    let tx = await contract.payToMint(address, nftMetadataUri, options);
    resultObject.txHash = tx.hash;

    const CIDnft = await storeNFT(
      imgPath,
      userName,
      userEmail,
      userDescription
    );
    resultObject.metaData = await (await fetch(CIDnft.url)).json();

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
