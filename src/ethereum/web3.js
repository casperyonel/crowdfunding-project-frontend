import Web3 from "web3";

export const web3 = new Web3(window.web3.currentProvider)
// connects us to a provider that's used to connect to the ethereum network.
// The provider will be supplied by metamask that is added to teh global object window in the browser.