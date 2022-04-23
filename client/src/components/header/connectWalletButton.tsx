import { useRecoilState } from "recoil";
import { userCurrentAccount } from "../../state/atoms";
import { connectWalletHandler } from "../../utils/web3"

export const ConnectWalletButton = ()=>{
    const [_,setCurrentWallet] = useRecoilState(userCurrentAccount);

    const connectHandler= async()=>{
        const accounts = await connectWalletHandler();
        setCurrentWallet(accounts[0]);
    }

    return <button onClick={connectHandler}>Connect Wallet</button>
}