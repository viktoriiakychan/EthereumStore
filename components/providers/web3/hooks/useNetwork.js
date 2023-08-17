import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Etereum Main Network",
  3: "Ropsten Test Network",
  5: "Rinkeby Test Network",
  42: "Koven Test Network",
  1337: "Ganashe",
};

export const handler = (web3, provider) => () => {
  const { mutate, ...rest } = useSWR(() => {
    web3 ? "web/network" : null,
      async () => {
        const chainId = await web3.eth.getChainId();
        console.log(`$cainId  = {cainId}`);
        return NETWORKS[chainId];
      };
  });

  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId) => {
        mutate(NETWORKS[parseInt(chainId, 16)]);
      });
  }, [web3]);

  return {
    network: {
      mutate,
      ...rest,
    },
  };
};
