// import { uploadToNetwork, getJsonMetaData } from "./Ipfs";
import { uploadToNetwork } from "./Ipfs";
import { PRICE, CONTRACTADDRESS } from "./Constants";
import { ethers } from "ethers";
import { tbtkNftJson } from "../contract/nft-config";

var contract;

async function loadTbtkNftContract(setContract) {
  console.log("Loading contract...");

  let contractAbi = tbtkNftJson.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACTADDRESS, contractAbi, signer);
}

async function requestAccount() {
  let account = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return account;
}

async function findAccountNfts(account) {
  account = ethers.utils.getAddress(account);

  const contractAbi = tbtkNftJson.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACTADDRESS, contractAbi, signer);
  // const code = await provider.getCode(CONTRACTADDRESS);

  console.log(`--Searching ${account}'s NFTs`);

  let nftURIs = [];

  for (let i = 0; ; i++) {
    try {
      let NFTOwner = await contract.ownerOf(i);
      if (account === NFTOwner) {
        let takenURI = await contract.tokenURI(i);
        nftURIs.push(takenURI);
      }
    } catch (error) {
      break;
    }
  }
  return nftURIs;
}

async function payToMintNft(userAccount, imagePath, nftName, nftDescription) {
  console.log(`5- userAccount ${userAccount}`);
  console.log("Started to NFT minting process...");
  loadTbtkNftContract();

  // let resultObject = {
  //   result: true,
  //   message: "Nft minted succesfully",
  //   txHash: null,
  //   metaDataUrl: "",
  //   imageUrl: "",
  //   imageName: "",
  //   imageDescription: "",
  // };
  let result;

  try {
    const options = {
      value: ethers.utils.parseEther(PRICE),
    };
    const CIDnft = await uploadToNetwork(nftName, nftDescription, imagePath);

    const metaDataUrl = `https://${CIDnft.ipnft}.ipfs.nftstorage.link/metadata.json`;

    // const jsonMetaData = await getJsonMetaData(metaDataUrl);
    // let imageCIDArr = jsonMetaData.image.replace(":/", "");
    // imageCIDArr = imageCIDArr.split("/");
    // const imgUrl = `https://${imageCIDArr[1]}.ipfs.dweb.link/${imageCIDArr[2]}`;

    //pay ethereum to mint nft
    // console.log("this is the contract: ", contract);
    // const tx = await contract.payToMint(userAccount, metaDataUrl, options);
    await contract.payToMint(userAccount, metaDataUrl, options);
    result = true;
    // result
    // message

    // resultObject.txHash = tx.hash;
    // resultObject.metaDataUrl = CIDnft.url;
    // resultObject.imageUrl = imgUrl;
    // resultObject.imageName = jsonMetaData.name;
    // resultObject.imageDescription = jsonMetaData.description;
    // console.log("this is the result object", resultObject);
    return result;
  } catch (e) {
    console.log(
      "Hata oluştu, bağ ağıyla yada ethereum miktarınınzla ilgili olabilir! error: ",
      e
    );
    result = false;
    // resultObject.result = false;
    // resultObject.message = e.data.message;
    // return resultObject;
    return result;
  }
}

export { payToMintNft, findAccountNfts, requestAccount };
