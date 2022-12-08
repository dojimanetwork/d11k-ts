import { Network } from '@d11k-ts/client'
import { PolkadotClient } from '@d11k-ts/polkadot'

async function checkPolka() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params} 'seed-phrase' and 'network'
   */
  const polkaClient = new PolkadotClient({ phrase, network: Network.Testnet })

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
    'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km',
  )
  console.log('Liquidity pool hash : ', liquidityPoolHash)

  /** Swap token from liquidity pool to receiver address
   * {@params}
   *     amount: number
   *     token: SwapAssetList (In this case - D11K.DOJ)
   *     inboundAddress: string // ArIBaddress (Get using getPolkadotInboundAddress() method)
   *     recipient: string (Dojima address)
   *
   * {@returns} tx hash: string
   * */
  const swapHash = await polkaClient.swap(
    1,
    'D11K.DOJ',
    inboundAddress,
    'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km',
  )
  console.log('Swap tx hash : ', swapHash)

  /** Stop polka instance
   *
   */
  process.exit()
}

;(async () => {
  await checkPolka()
})()
