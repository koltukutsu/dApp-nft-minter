import "../Utils.css";
import { useState, useEffect } from "react";
import Install from "./Install";
import {
  checkMetamask,
  loadTbtkNftContact,
  payToMintNft,
  requestAccount,
} from "./web3-handlers";

function UserConnection() {
  const [metaMaskCondition, setMetaMaskCondition] = useState(false);
  const [userAccount, setUserAccount] = useState("");
  const [contract, setContract] = useState();
  const [nftDatas, updateNftData] = useState([]);
  const [userName, updateUserName] = useState("");
  const [userEmail, updateUserEmail] = useState("");

  function isMetamaskInstalled() {
    let userCondition = checkMetamask();
    setMetaMaskCondition(userCondition);
  }

  async function FetchUserAccount() {
    let account = await requestAccount();
    setUserAccount(account);
    console.log(`User Account: ${account}`);
  }

  async function LoadContract() {
    let contractAddress = "0x97c96aFA24f91E4De041E4c58230094Ae4f68f71";
    await loadTbtkNftContact(contractAddress);
    setContract(contractAddress);
  }

  async function Connection() {
    alert(
      "Control your Metamask Account\nRemember to be connected to the BAG Network"
    );
    await FetchUserAccount();
    await LoadContract();
  }

  async function MintNFT() {
    let address = "0xe156e7C38c652119E393E0eA36A22005517E6103";
    let metaDataUri = "metadata111211111";

    for (let i = 0; i < nftData.length; i++) {
      try {
        let currentData = await payToMintNft(address, metaDataUri);

        updateNftData(...(nftDatas) => [...nftDatas, currentData]);
      } catch (e) {
        alert("Ethereum Transaction was not carried!!!");
      } finally {
        setNftData(nftData);
        console.log("User Datas", userName, userEmail);
        console.log("NFT data:", nftData);
      }
    }
  }

  const MetamaskSection = () => {
    if (metaMaskCondition) {
      return (
        <div className="accountInfoHolder">
          <label>User Account: {userAccount}</label>
          <br />
          <label>Smart Contract: {contract}</label>
          <br />
          <button onClick={Connection}>Connect Account</button>
        </div>
      );
    } else {
      return <Install />;
    }
  };

  useEffect(() => {
    if (!metaMaskCondition) {
      isMetamaskInstalled();
    }
  });

  return (
    <div className="All-container">
      <div className="Metamask-section">
        <MetamaskSection />
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <div className="Nft-minting-section">
                {userAccount ? (
                  <form
                    className="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      try {
                        MintNFT();
                      } catch (e) {
                        alert("An error occured while minting NFT");
                      }
                    }}
                  >
                    <div className="title">Welcome</div>
                    <div className="subtitle">Let's create an Nft</div>
                    <div className="input-container ic1">
                      <input
                        id="firstname"
                        className="input"
                        type="text"
                        value={userName}
                        placeholder="First and Surname"
                        onChange={(e) => updateUserName(e.target.value)}
                        onBlur={(e) => updateUserName(e.target.value)}
                      />
                      <div className="cut"></div>
                    </div>
                    <div className="input-container ic2">
                      <input
                        id="email"
                        className="input"
                        type="text"
                        value={userEmail}
                        placeholder="Email"
                        onChange={(e) => updateUserEmail(e.target.value)}
                        onBlur={(e) => updateUserEmail(e.target.value)}
                      />
                      <div className="cut cut-short"></div>
                    </div>
                    <button
                      disabled={!(userEmail.length && userName.length)}
                      type="text"
                      className="submit"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <div className="No-Connection">
                    <div className="title">Welcome</div>
                    <div className="subtitle">Please Connect Your Account</div>
                  </div>
                )}
              </div>
            </th>
            <th>
              <div className="Place-holder"></div>
            </th>
            <th>
              <div className="Nft-displaying-section">
                <h2>No nft minted </h2>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export { UserConnection };
