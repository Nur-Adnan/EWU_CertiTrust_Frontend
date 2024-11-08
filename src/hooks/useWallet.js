import { useState, useEffect } from "react";
import { magic } from "../utils/Magic";
import useAuth from "./useAuth";
import { ethers } from "ethers";
import CertiTrustABI from "./../utils/CertiTrust.json";

const certiTrustContract = "0xdb2858E497F1976e956F9f625237FFcCb6B57E3E";

const useWallet = () => {
    const { isConnected, account } = useAuth();
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [certiTrust, setCertiTrust] = useState(null);
    const zeroGas = {
        gasPrice: ethers.BigNumber.from(0),
    };

    useEffect(() => {
        const checkWalletProvider = async () => {
            if (isConnected && account !== null) {
                // Initialize provider and signer
                const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
                const signer = provider.getSigner();

                // Update state
                setProvider(provider);
                setSigner(signer);

                // Initialize contract
                const contract = new ethers.Contract(certiTrustContract, CertiTrustABI.abi, signer);
                setCertiTrust(contract);
            }
        };

        checkWalletProvider();
    }, [isConnected, account]); // Only re-run when `isConnected` or `account` changes

    return { provider, signer, certiTrust, zeroGas };
};

export default useWallet;