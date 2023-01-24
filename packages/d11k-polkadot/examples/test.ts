import { Network } from '@d11k-ts/client'
import { PolkadotClient } from '@d11k-ts/polkadot'

async function checkPolka() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params} 'seed-phrase' and 'network'
   * for testnet/devnet pass {
   *    provider: 'wss://dotws-test.h4s.dojima.network:9944'
   *  }
   */
  const polkaClient = new PolkadotClient({
    phrase,
    network: Network.Testnet,
    provider: 'wss://dotws-test.h4s.dojima.network:9944',
  })

  /** Generate Address for phrase
   *
   *  {@returns} address: string
   *  */
  const address = await polkaClient.getAddress()
  console.log('Address :: ', address)

  /** Get token balance of address
   * {@params} 'address'
   *
   * {@returns} balance: number
   * */
  const bal = await polkaClient.getBalance('5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
  console.log('Balance :: ', bal)

  /** Get gas fee for transaction
   * {@params} 'address' and 'amount'
   *
   * {@returns} gas fees: GasfeeResult
   * */
  const fees = await polkaClient.getFees({
    recipient: '5FKpdt1vdgQ2CNeNQXN9evodm4wBH6655R1GyV44tBdNgXP6',
    amount: 0.01,
  })
  console.log('Fees : ', fees)

  /** Transfer token to receiver address
   * {@params}
   *     amount: number
   *     recipient: address
   *
   * {@returns} tx hash: string
   * */
  const hash = await polkaClient.transfer({
    recipient: '5FKpdt1vdgQ2CNeNQXN9evodm4wBH6655R1GyV44tBdNgXP6',
    amount: 0.01,
  })
  console.log('Tx hash : ', hash)

  /** Get Polkadot Inbound address
   *
   * {@returns} Dot Inbound address: string
   * */
  const inboundAddress = await polkaClient.getPolkadotInboundAddress()
  console.log('Inbound Address :: ', inboundAddress)

  /** Dummy transaction using memo
   * {@params}
   *     amount: number
   *     recipient: address
   *     memo: string       // Ex: 'memo:NOOP:NOVAULT'
   *
   * {@returns} tx hash: string
   * */

  const batchTxHash = await polkaClient.polkaBatchTxsToHermes(2, inboundAddress, 'memo:NOOP:NOVAULT')
  console.log('Batch Tx hash :: ', batchTxHash)

  /** Get default liquidity pool gas fee
   *
   * {@returns} LP gas fee: number
   * */
  const LPDefaultGasFee = await polkaClient.getDefaultLiquidityPoolGasFee()
  console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)

  /** Add DOT token into liquidity pool
   * {@params}
   *     amount: number
   *     inboundAddress: string // DotIBaddress (Get using getPolkadotInboundAddress() method)
   *     dojAddress?: string // Optional dojima address. Better to pass doj address but not mandatory
   *
   * {@returns} liquidity pool hash: string
   * */
  const liquidityPoolHash = await polkaClient.addLiquidityPool(
    1,
    inboundAddress,
    // 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km',     // optional
  )
  console.log('Liquidity pool hash : ', liquidityPoolHash)

  /** Swap token from liquidity pool to receiver address
   * {@params}
   *     amount: number
   *     token: SwapAssetList
   *     inboundAddress: string // ArIBaddress (Get using getPolkadotInboundAddress() method)
   *     recipient: string (respective recipient token address)
   *
   * {@returns} tx hash: string
   * */
  // const d11kswapHash = await polkaClient.swap(1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
  // console.log('Swap tx hash : ', d11kswapHash)
  // const arswapHash = await polkaClient.swap(5,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
  // console.log('Swap tx hash : ', arswapHash)
  // const ethswapHash = await polkaClient.swap(2,'ETH.ETH', inboundAddress, '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
  // console.log('ETH Swap tx hash : ', ethswapHash)
  const solswapHash = await polkaClient.swap(
    3,
    'SOL.SOL',
    inboundAddress,
    'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS',
  )
  console.log('SOL Swap tx hash : ', solswapHash)

  /** Stop polka instance
   *
   */
  process.exit()
}

;(async () => {
  await checkPolka()
})()
