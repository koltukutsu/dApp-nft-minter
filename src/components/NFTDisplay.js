import { useEffect, useState, useRef } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Paper,
} from "@mui/material";

import { findAccountNfts } from "../lib/Web3";
import { getJsonMetaData } from "../lib/Ipfs";

export default function NFTDisplay({ userAccount }) {
  const [NFTElements, setNFTElements] = useState(
    <Paper elevation={3}>
      <Typography
        className="pl-10 pb-8 text-slate-700 text"
        variant="h2"
        noWrap
      >
        Account's NFTs{" "}
        <Typography className="text-red-600" variant="h4">
          {userAccount}
        </Typography>
        <Typography className="text-green-500" variant="h4">
          No NFT is uploaded to the ipfs network!!!
        </Typography>
      </Typography>
    </Paper>
  );
  const userNFTs = useRef([]);

  const handleNFTDatas = async () => {
    var listNFtsMetadata = [];
    var userAccountURIs = await findAccountNfts(userAccount);
    for (let uri of userAccountURIs) {
      let metaDataIPFS = uri.replace("ipfs://", "");
      let jsonMetaData = await getJsonMetaData(metaDataIPFS);

      let imageCID = jsonMetaData.image.replace(":/", "");
      let imageCIDArray = imageCID.split("/");
      const imgUrl = `https://${imageCIDArray[1]}.ipfs.dweb.link/${imageCIDArray[2]}`;

      let completeObject = {
        imageUrl: imgUrl,
        imageName: jsonMetaData.name,
        imageDescription: jsonMetaData.description,
      };

      listNFtsMetadata.push(completeObject);
    }
    userNFTs.current = listNFtsMetadata;

    setNFTElements(
      <div className="self-center items-center px-8 ">
        <Paper elevation={3}>
          <Typography
            className="pl-10 pb-8 text-slate-700 text"
            variant="h2"
            noWrap
          >
            Account's NFTs{" "}
            <Typography className="text-red-600" variant="h4">
              {userAccount}
            </Typography>
          </Typography>
          <ImageList className="w-full h-[600px] rounded-md " cols={3}>
            {userNFTs.current.map((nft) => (
              <ImageListItem key={nft.imageUrl}>
                <img
                  className="rounded-3xl px-4"
                  src={nft.imageUrl}
                  srcSet={nft.imageUrl}
                  alt={nft.imageDescription}
                  loading="lazy"
                />
                <ImageListItemBar
                  className="text-slate-700 px-6"
                  title={nft.imageName}
                  subtitle={<span>{nft.imageDescription}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Paper>
      </div>
    );
  };

  useEffect(() => {
    handleNFTDatas();
  });

  return <>{NFTElements}</>;
}
