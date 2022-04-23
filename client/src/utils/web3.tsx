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