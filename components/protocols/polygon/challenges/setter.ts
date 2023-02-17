import SimpleStorageJson from 'contracts/polygon/SimpleStorage/SimpleStorage.json';
import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const setValue = async (contractAddress: string, value: number) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // contract address is 0xe85D60aa947Aee5e794674413a05607B49bdDc80
    const contract = new ethers.Contract(
      contractAddress,
      SimpleStorageJson.abi,
      signer,
    );

    console.log(provider.getCode(contractAddress));
    // add gasLimit to prevent transaction reverting.
    const transactionResult = await contract.set(value, {gasLimit: 500000});
    const receipt = await transactionResult.wait();
    return {hash: receipt.transactionHash};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default setValue;
