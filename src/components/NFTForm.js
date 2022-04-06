import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  ButtonGroup,
  Button,
  FormControl,
  TextField,
  Stack,
  Skeleton,
} from "@mui/material";

import { payToMintNft } from "../lib/Web3";

export default function NFTForm({ userAccount }) {
  const [nftName, updateNftName] = useState("");
  const [nftDescription, updateNftDescription] = useState("");
  const [nftImage, setNftImage] = useState(0);

  const nftSubmit = async () => {
    console.log("4- NFT is submitted");
    // let mintedNFT;
    // mintedNFT = await payToMintNft(
    //   userAccount,
    //   nftImage,
    //   nftName,
    //   nftDescription
    // );
    let transactionResult = await payToMintNft(
      userAccount,
      nftImage,
      nftName,
      nftDescription
    );
  };

  const ButtonType = () => {
    if (nftImage && nftName.length && nftDescription.length) {
      return (
        <Button
          component="span"
          onClick={nftSubmit}
          variant="contained"
          color="success"
          type="submit"
        >
          Send
        </Button>
      );
    } else {
      return (
        <Button variant="outlined" color="error">
          Fill the Required
        </Button>
      );
    }
  };

  const FileUpload = (e) => {
    try {
      let file = e.target.files[0];
      setNftImage(file);
    } catch (error) {
      console.log("error uploading file:", error);
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <FormControl className="self-center items-center space-y-6">
      <div className="flex flex-col w-11/12 space-y-3">
        <TextField
          required
          autoFocus={true}
          label="NFT Name"
          value={nftName}
          onChange={(e) => {
            updateNftName(e.target.value);
          }}
          inputProps={{ maxLength: 255 }}
        ></TextField>
        <TextField
          required
          // focused
          label="NFT Description"
          value={nftDescription}
          multiline
          maxRows={5}
          onChange={(e) => {
            updateNftDescription(e.target.value);
          }}
          inputProps={{ maxLength: 255 }}
        ></TextField>
      </div>

      {nftImage ? (
        <img
          className="w-96 h-fit rounded-2xl"
          alt={"Uploaded NFTs"}
          src={URL.createObjectURL(nftImage)}
        />
      ) : (
        <Stack>
          <Skeleton
            variant="rectangular"
            animation="wave"
            style={{ borderRadius: 8 }}
            width={390}
            height={218}
          />
        </Stack>
      )}
      <ButtonGroup
        size="medium"
        orientation="horizontal"
        aria-label="horizontal outlined button group"
      >
        <label htmlFor="upload-nft">
          <Input
            hidden
            accept=".jpeg, .jpg, .png, .svg"
            id="upload-nft"
            multiple
            type="file"
            onChange={FileUpload}
            onBlur={FileUpload}
          />
          <Button
            className="pr"
            variant="outlined"
            component="span"
            color="info"
          >
            Upload Image
          </Button>
        </label>
        {ButtonType()}
      </ButtonGroup>
    </FormControl>
  );
}
