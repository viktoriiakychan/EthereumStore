import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x7a7236aa8a3e96f850a40a4181c07692db1f8979b6d60a472fbb69cb5c094783": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);

  return {
    account: {
      data,
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest,
    },
  };
};
