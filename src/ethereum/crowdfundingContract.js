import { web3 } from "./web3";
import crowdfundingAbi from "./crowdfundingAbi";

export function createContract(contractAddress) {
    return new web3.eth.Contract(crowdfundingAbi, contractAddress)
}
// This is the web3 instance of our contract.
// Abi and address to create.
// With this now we can fetch data from an ethereum network.
// Remember, we need Abi and contract address to interact. 