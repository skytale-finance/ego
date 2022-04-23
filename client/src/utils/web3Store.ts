import { NFTStorage, File } from 'nft.storage';
import axios from 'axios';
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2NWIwMzJCQ2VlOUIzNWMwNzlkZDY1ODMwQTY2ODVjNDgyMjgxODkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MDcxODczNzk5MCwibmFtZSI6ImVnbyJ9.qNG4PjRdddYay4NW5OXDjoDVKpYSCpm-IAw3HkayxpM';

export const uploadToWeb3Storage=(image:File, name:string, description:any) =>{
    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    });
}

export const getFileMetaData=async (fileHash:string)=>{
    const response = await axios.get(`https://ipfs.io/ipfs/${fileHash}/metadata.json`);
    return response.data;
}