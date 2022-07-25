import abi from './abi/abi.json' assert{type: "json"};
import Web3 from 'web3';

//sc = 0xC57e15c7194E1D7bDF0187E7648357D395a406C1

const blockchain = new Promise((res, rej) => {
    //if metamask is available
    if(typeof window.ethereum == "undefined"){
        rej("You should install metamask to use it");
    }

    //Web3 Instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, '0xC57e15c7194E1D7bDF0187E7648357D395a406C1');

    // Get my Metamask address
    web3.eth.getAccounts().then((accounts) =>{
        console.log("My account: ", accounts[0])
    });

    // Get the current supply of NFT tokens
    web3.eth.getAccounts().then((accounts) =>{
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) =>{
            console.log("Current supply: ", supply)
        })
    });

    // Get the maximum supply of NFT tokens
    web3.eth.getAccounts().then((accounts) =>{
        contract.methods.maxSupply().call({from: accounts[0]}).then((maxsupply) =>{
            console.log("Max supply: ", maxsupply)
        })
    });

    // Get your buildings made in the Metaverse
    web3.eth.getAccounts().then((accounts) =>{
        contract.methods.getOwnerBuildings().call({from: accounts[0]}).then((buildings) =>{
            console.log("Your buildings: ", buildings)
        })
    });


    //get all the buildings made in the Metaverse
    web3.eth.getAccounts().then((accounts) =>{
        contract.methods.totalSupply().call({from: accounts[0]}).then((buildings) => {

        })
    });


})