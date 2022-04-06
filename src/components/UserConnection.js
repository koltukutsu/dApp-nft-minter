import { Button } from "@mui/material";

import { checkMetamask, InstallMetamask } from "./MetamaskInstallation";
import { requestAccount } from "../lib/Web3";

export default function UserConnection({ setAccountOutside }) {
  const AccountConnection = () => {
    const handleAccountConnection = async () => {
      console.log("Connecting Account...");
      var userAccount = await requestAccount();
      console.log("control: ", userAccount);
      setAccountOutside(userAccount[0]);
    };

    return (
      <div
        id="connect-button-container"
        className="flex justify-center text-center"
      >
        <Button variant="outlined" onClick={handleAccountConnection}>
          Connect Metamask Account
        </Button>
      </div>
    );
  };

  console.log("1- Metamask control");
  if (!checkMetamask()) {
    return (
      <div>
        <InstallMetamask />
      </div>
    );
  } else {
    console.log("2- Account control");
    return (
      <div>
        <AccountConnection />
      </div>
    );
  }
}
