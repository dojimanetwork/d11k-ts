export enum Chain {
  Hermes = 'D11K',
}

export const HermesChain = Chain.Hermes

/**
 * Type guard to check whether string  is based on type `Chain`
 *
 * @param {string} c The chain string.
 * @returns {boolean} `true` or `false`
 */
export const isChain = (c: string): c is Chain => (Object.values(Chain) as string[]).includes(c)

/**
 * Sees if one chain is equal to another chain
 *
 * @param a chain a
 * @param b chain b
 * @returns boolean: True if equal else False
 */
export const eqChain = (a: Chain, b: Chain) => {
  return a == b
}

/**
 * Convert chain to string.
 *
 * @param {Chain} chainId.
 * @returns {string} The string based on the given chain type.
 */
export const chainToString: ((chainId: Chain) => string) & Record<Chain, string> = Object.assign(
  (chainId: Chain) => {
    if (!(chainId in chainToString)) return 'unknown chain'
    return chainToString[chainId]
  },
  {
    [Chain.Hermes]: 'D11K',
  },
)

/**
 * Check whether chain is BTC chain
 */
export const isHermesChain = (chain: Chain): boolean => eqChain(chain, HermesChain)
