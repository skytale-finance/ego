import { ethers } from 'ethers';
import NFTStorageAbi from '../contracts/NFTStorage.json';
import { UserToken } from '../state/atoms';
import { getFileMetaData } from './web3Store';

const contractAddress = '0xE726da86EC954a5602C4251d9553B7755E1978B5';

export const connectWalletHandler = async () => {
    const { ethereum } = window as any;

    if (!ethereum) {
        console.log('Metamask not found!!');
        return;
    }

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        return accounts;
    } catch (error) {
        console.error(error);
    }
}

export const getNFTContract = () => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nft = new ethers.Contract(contractAddress, NFTStorageAbi, provider);
    return nft.connect(signer);
}

export const mintNFT = async (fileHash: string, userAddress: string) => {
    const nftContract = getNFTContract();
    const tx = await nftContract.mintNFT(fileHash);
    const response = await tx.wait();
}

export const getUserTokens = async (userAddress: string) => {
    const nftContract = getNFTContract();
    const tokenIds = (await nftContract.getTokenUri(userAddress)).toString().split(',');
    const userTokens: UserToken[] = [];

    for (const id of tokenIds) {
        const fileHash = await nftContract.tokenURI(id);
        const fileMetadata = await getFileMetaData(fileHash);
        userTokens.push(fileMetadata as UserToken);
    }
    return userTokens;
}