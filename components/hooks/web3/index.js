import { useHooks } from "@components/providers/web3"

const enhanceHook = (swrRes) => {
    return {
        ...swrRes,
        hasInitialResponce: swrRes.data || swrRes.error
    }
}

import { useHooks } from "@components/providers/web3"

export const useNetwork = () => {
    const swrRes = enhanceHook(useHooks((hooks) => hooks.useNetwork)());
  return {
    network: swrRes,
  }
}


export const useAccount = () => {
    const swrRes = enhanceHook(useHooks((hooks) => hooks.useAccount)());
  return {
    network: swrRes,
  }
}
