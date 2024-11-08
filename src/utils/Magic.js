import { Magic } from "magic-sdk";

const customNodeOptions = {
  rpcUrl: "https://vercel-blockchain-proxy-nine.vercel.app/",
  chainId: 148460,
};

// const API_KEY = import.meta.env.MAGIC_API_KEY;

// Initialize Magic instance
const magic = new Magic("pk_live_E3A943F857795445", {
  network: customNodeOptions,
  useStorageCache: true,
});

export { magic };
