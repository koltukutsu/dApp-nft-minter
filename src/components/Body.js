import { useEffect, useState } from "react";

import UserConnection from "./UserConnection";
import NFTForm from "./NFTForm";
import NFTDisplay from "./NFTDisplay";

export default function Body() {
  const [userAccount, setUserAccount] = useState("");

  useEffect(() => {
    if (userAccount) {
      console.log("user account: ", userAccount);
    }
  }, [userAccount]);
  /* 
    first, I need to use a flag and dispose/remove the flag's traces after return in useEffect 
    second, need to find the acountNFTs
    third, should pass the found acounts into the NFTDisplay
    that would solve the problem 
  */

  if (!userAccount.length) {
    return <UserConnection setAccountOutside={setUserAccount} />;
  } else {
    return (
      <div className="flex flex-col gap-y-10">
        <NFTForm userAccount={userAccount} />

        <NFTDisplay userAccount={userAccount} />
        <div className="h-10"></div>
      </div>
    );
  }
}
