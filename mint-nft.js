require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("./myNFT.json");
console.log(JSON.stringify(contract.abi));

const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function adminMint(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.adminMint(PUBLIC_KEY, tokenURI).encodeABI()
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
        if (!err) {
        console.log("The hash of your transaction is: ", hash); 
      } else {
        console.log("Something wrong while submit the transaction", err)
      }
    });
  }).catch((err) => {
    console.log(" Promise failed:", err);
  });
  }
  adminMint("https://gateway.pinata.cloud/ipfs/Qmc9LQrrjPNnDW7wUvmWeVhkMA6146XRp9DbduWCz8Bfoy")​