import { Network } from '@d11k-ts/client'
import { SolanaClient } from '@d11k-ts/solana'

async function checkSolana() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params} 'seed-phrase', 'network' and 'config' (only for testnet or stagenet)
   *  for devnet/testnet pass {
   *    endpoint: 'https://sol-test.h4s.dojima.network:8899'
   *  }
   */
  const solClient = new SolanaClient({
    phrase,
    network: Network.Stagenet,
    endpoint: 'https://sol-test.h4s.dojima.network:8899',
  })

  /** Generate Address for phrase
   *
   *  {@returns} address: string
   *  */
  const address = await solClient.getAddress()
  console.log('Address :: ', address)

  /** Get token balance of address
   * {@params} 'address'
   * {@returns} balance: number
   * */
  const bal = await solClient.getBalance('DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS')
  console.log('Balance :: ', bal)

  /** Get transaction details using txHash
   * {@params} 'txHash'
   * {@returns} tx details: SolTxData
   * */
  const data = await solClient.getTransactionData(
    '2cEskW8Xk5GZTajRaKTMySYWMRqtJV3Xe8P6mn8e4Xc634PiFDeChZYrtox1UE1e7gHnKRf7v4KfXPPZW82KJKDT',
  )
  console.log('Tx data : ', data)

  /** Get gas fee for transaction
   *
   * {@returns} gas fees: GasfeeResult
   * */
  const fees = await solClient.getFees()
  console.log('Fees : ', fees.fast)

  /** Get transaction history of address
   * {@params}
   *     address: Address     // Address to get history for
   *     offset?: number      // Optional Limit of transactions
   *     beforeHash?: string  // Optional All txs before mentioned hash
   *     untilHash?: string   // Optional All txs until mentioned hash
   *
   * {@returns} txs history: SolTxs
   * */
  const txs = await solClient.getTransactionsHistory({ address: 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS' })
  console.log('Txs : ', txs)

  /** Transfer token to receiver address
   * {@params}
   *     amount: number
   *     recipient: address
   *
   * {@returns} tx hash: string
   * */
  const hash = await solClient.transfer({ amount: 0.0001, recipient: 'G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n' })
  console.log('Tx hash : ', hash)

  /** Get Solana Inbound address
   *
   * {@returns} Sol Inbound address: string
   * */
  const inboundAddress = await solClient.getSolanaInboundAddress()
  console.log('Inbound Address :: ', inboundAddress)

  /** Get default liquidity pool gas fee
   *
   * {@returns} LP gas fee: number
   * */
  const LPDefaultGasFee = await solClient.getDefaultLiquidityPoolGasFee()
  console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)

  /** Add SOL token into liquidity pool
   * {@params}
   *     amount: number
   *     inboundAddress: string // SolIBaddress (Get using getSolanaInboundAddress() method)
   *     dojAddress?: string // Optional dojima address. Better to pass doj address but not mandatory
   *
   * {@returns} liquidity pool hash: string
   * */
  const liquidityPoolHash = await solClient.addLiquidityPool(
    1,
    inboundAddress,
    'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km',
  )
  console.log('Liquidity pool hash : ', liquidityPoolHash)

  /** Swap token from liquidity pool to receiver address
   * {@params}
   *     amount: number
   *     token: SwapAssetList (In this case - D11K.DOJ)
   *     inboundAddress: string // SolIBaddress (Get using getArweaveInboundAddress() method)
   *     recipient: string (Dojima address)
   *
   * {@returns} tx hash: string
   * */
  const swapHash = await solClient.swap(1, 'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
  console.log('Swap tx hash : ', swapHash)
}

;(async () => {
  await checkSolana()
})()
