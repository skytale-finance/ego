import { useRecoilValue } from "recoil";
import { userCurrentAccount } from "../../state/atoms";
import { Brand } from "./brand";
import { ConnectWalletButton } from "./connectWalletButton";

export const Header = ()=>{
    const currentAddress = useRecoilValue(userCurrentAccount);

    const styles = {
        header:{
            display:'flex',
            justifyContent:'space-between'
        }
    };

    return <header style={styles.header} className="jumbotron">
        <div><Brand/></div>
        <div>{!currentAddress && <ConnectWalletButton/>}</div>
        <div>{currentAddress && `${currentAddress}`}</div>
    </header>
}