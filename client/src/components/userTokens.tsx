import { useRecoilValue } from "recoil"
import { userTokens } from "../state/atoms"
import { useEffect } from "react";
import { getFileMetaData } from "../utils/web3Store";

export const UserTokens = ()=>{
    const userTokensList = useRecoilValue(userTokens);
    
    return <div>
        <b>My Documents:</b>
        <ul>
        {userTokensList && userTokensList.map(token=><li key={token.image}>
            <img src={token.image.replace('ipfs://','https://ipfs.io/ipfs/')} alt={token.name} />
        </li>)}
        </ul>
    </div>
}