import { useRecoilState } from "recoil";
import { userCurrentAccount, UserToken, userTokens } from "../../state/atoms";
import { connectWalletHandler, getUserTokens } from "../../utils/web3"

export const ConnectWalletButton = ()=>{
    const [_,setCurrentWallet] = useRecoilState(userCurrentAccount);
    const [__, setUserTokens] = useRecoilState(userTokens);

    const connectHandler= async()=>{
        const accounts = await connectWalletHandler();
        setCurrentWallet(accounts[0]);

        const userTokens = await getUserTokens(accounts[0]);
        setUserTokens(userTokens as UserToken[]);
    }

    return <button onClick={connectHandler}>Connect Wallet</button>
}