import { ethers } from 'ethers';

const contractAddress = "";
const CertificateVerificationABI = [];

export const getSmartContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, CertificateVerificationABI, signer);
};