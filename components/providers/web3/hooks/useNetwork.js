import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Etereum Main Network",
  3: "Ropsten Test Network",
  59144: "Linea Test Network",
  5: "Rinkeby Test Network",
  42: "Koven Test Network",
  1337: "Ganashe",
};

const tergetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(web3 ? "web/network" : null, async () => {
    const chainId = await web3.eth.getChainId();
    return NETWORKS[chainId];
  });

  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId) => {
        mutate(NETWORKS[chainId]);
      });
  }, [web3]);

  return {
    data,
    mutate,
    target: tergetNetwork,
    isSupported: data === tergetNetwork,
    ...rest,
  };
};
