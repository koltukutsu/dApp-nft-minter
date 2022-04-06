import { NFTStorage } from "nft.storage";
import { NFT_STORAGE_KEY } from "./Constants";

async function uploadToNetwork(name, description, image) {
  console.log("6- Metadata is being uplaoded to the ipfs network...");
  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  try {
    let metaData = await client.store({
      image,
      name,
      description,
    });
    return metaData;
  } catch (error) {
    console.log("storeNft error: ", error);
  }
}

async function getJsonMetaData(url) {
  console.log("IPFS- Getting NFT metadata...");
  try {
    let response = await fetch(`${url}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export { uploadToNetwork, getJsonMetaData };
