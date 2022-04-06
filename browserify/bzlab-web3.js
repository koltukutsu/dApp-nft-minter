const ethers = require('ethers');
const nftArtifact = require('./nft-artifact');

var contract = null;

const mintPrice = "0.1";
const nftContractAddress = "0xe156e7C38c652119E393E0eA36A22005517E6103";
const nftStorageApiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA5MDM0RERiMjA5MzE5NjgyNjg5NTNGRDIxZWY0RjY3ODA1RTM1NzAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NjMzMDc5MTA2NywibmFtZSI6InRidGsifQ.zl9B665qoAqjdhoM3xnZdgHeRPnKuRJHaUhn3yLJo8Q";


var bzlabWeb3 = {
  nftContractAddress: nftContractAddress
}

module.exports = { bzlabWeb3 }