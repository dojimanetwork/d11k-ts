import { ArweaveClient } from '@d11k-ts/arweave'
import { Network } from '@d11k-ts/client'

async function TestArweave() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params} 'seed-phrase', 'network' and 'config' (only for testnet or stagenet)
   *  for testnet pass
          config : {
            host: 'ar-test.h4s.dojima.network',
            timeout: 100000,
          }
   */
  const arClient = new ArweaveClient({
    phrase,
    network: Network.Testnet,
    config: {
      host: 'ar-test.h4s.dojima.network',
      timeout: 100000,
    },
  })

  /** Generate Address for phrase
   *
   *  {@returns} address: string
   *  */
  const address = await arClient.getAddress()
  console.log('Address :: ', address)

  /** Get token balance of address
   * {@params} 'address'
   *  Note: For testing call mint function once to get 5 dummy AR tokens
   * {@returns} balance: number
   * */
  await arClient.mintArTokens('7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
  const bal = await arClient.getBalance('7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
  console.log('Balance :: ', bal)

  /** Get transaction details using txHash
   * {@params} 'txHash'
   * {@returns} tx details: ArTxDataResult
   * */
  const data = await arClient.getTransactionData('xnwCmS_oyt6u_yYjCD0kPOC8zMHp16wHF0vcY7ORMPg')
  console.log('Tx data : ', data)
  // const pooldata = await arClient.getTransactionData('C8F3Y2n2g5YeCjR7qKJsQ_NiceWflVPXZELBkj1zO3Q')
  // console.log('Tx data : ', pooldata)

  /** Get gas fee for transaction
   * Create rawTx by using receiver address and amount to generate gas fee
   *
   * {@returns} gas fees: GasfeeResult
   * */
  const rawTx = await arClient.createTransaction('UV6NJyujIFMIaL-oD9TK9P3QQlpmov3UFTdMtvY5xbI', 0.5)
  const fees = arClient.getFees(rawTx)
  console.log('Fees : ', fees.fast)

  /** Get transaction history of address
   * {@params}
   *     address: Address // Address to get history for
   *     limit?: number // Optional Limit of transactions
   *
   * {@returns} txs history: ArTxs
   * */
  const txs = await arClient.getTransactionsHistory({ address: '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4' })
  console.log('Txs : ', txs)

  /** Transfer token to receiver address
   * {@params}
   *     amount: number
   *     recipient: address
   *
   * {@returns} tx hash: string
   * */
  const hash = await arClient.transfer({ recipient: 'UV6NJyujIFMIaL-oD9TK9P3QQlpmov3UFTdMtvY5xbI', amount: 0.5 })
  console.log('Tx hash : ', hash)

  /** Get Arweave Inbound address
   *
   * {@returns} Ar Inbound address: string
   * */
  const inboundAddress = await arClient.getArweaveInboundAddress()
  console.log('Inbound Address :: ', inboundAddress)

  /** Get default liquidity pool gas fee
   *
   * {@returns} LP gas fee: number
   * */
  const LPDefaultGasFee = await arClient.getDefaultLiquidityPoolGasFee()
  console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)

  /** Add AR token into liquidity pool
   * {@params}
   *     amount: number
   *     inboundAddress: string // ArIBaddress (Get using getArweaveInboundAddress() method)
   *     dojAddress?: string // Optional dojima address. Better to pass doj address but not mandatory
   *
   * {@returns} liquidity pool hash: string
   * */
  const liquidityPoolHash = await arClient.addLiquidityPool(
    1,
    inboundAddress,
    'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km',
  )
  console.log('Liquidity pool hash : ', liquidityPoolHash)

  /** Swap token from liquidity pool to receiver address
   * {@params}
   *     amount: number
   *     token: SwapAssetList (In this case - D11K.DOJ)
   *     inboundAddress: string // ArIBaddress (Get using getArweaveInboundAddress() method)
   *     recipient: string (Dojima address)
   *
   * {@returns} tx hash: string
   * */
  const swapHash = await arClient.swap(1, 'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
  console.log('Swap tx hash : ', swapHash)
}

;(async () => {
  await TestArweave()
})()
