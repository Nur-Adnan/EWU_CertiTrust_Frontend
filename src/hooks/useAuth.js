import { useState, useEffect } from "react";
import { magic } from "../utils/Magic";
import { useLocation } from "react-router-dom";
import api from "./../api";

const useAuth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  const userInfo = async () => {
    try {
      const userMagic = await magic.user.getInfo();
      setUser(userMagic);

      // Fetch role from backend if the user is logged in
      if (userMagic) {
        const { data } = await api.get("/users/role", {
          params: {
            email: userMagic.email,
          },
        });
        setRole(data.role);

        const profile = await api.get("/users/profile", {
          params: {
            email: userMagic.email,
          },
        });
        setProfile(profile.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      if (!isConnected) {
        const isLoggedIn = await magic.user.isLoggedIn();
        setIsConnected(isLoggedIn);

        if (isLoggedIn) {
          const accounts = await magic.user.getInfo();
          setAccount(accounts.publicAddress);
        }
      }
    };

    checkIfUserIsLoggedIn();
    userInfo();
  }, [isConnected]);

  const connectWallet = async () => {
    try {
      const accounts = await magic.wallet.connectWithUI();
      setIsConnected(true);
      setAccount(accounts[0]);

      if (!location.pathname.includes("/android")) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return { isConnected, account, connectWallet, user, role, profile };
};

export default useAuth;
