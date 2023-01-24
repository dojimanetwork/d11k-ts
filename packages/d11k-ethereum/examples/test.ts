import { Network } from '@d11k-ts/client'
import { EthereumClient } from '@d11k-ts/ethereum'
// import { assetAmount, assetToBase, baseToAsset } from '@d11k-ts/utils'

async function checkEth() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params}
   *    'seed-phrase' and 'network'
   *    for devnet/testnet pass {
   *      endpoint: 'https://eth-test.h4s.dojima.network/'  or  'https://eth-test.h4s.dojima.network:9545/'
   *    }
   *    infuraApiKey: string, Optional (Api key provided by 'Infura' for mainnet calls. Sign up for getting one)
   */
  const ethClient = new EthereumClient({
    phrase,
    network: Network.Testnet,
    rpcUrl: 'https://eth-test.h4s.dojima.network/',
    // rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
  })

  /** Generate Address for phrase
   *
   *  {@returns} address: string
   *  */
  const address = ethClient.getAddress()
  console.log('Address :: ', address)

  /** Get token balance of address
   * {@params} address: string
   *
   * {@returns} balance: number
   * */
  const balance = await ethClient.getBalance(address)
  console.log('Balance :: ', balance)

  /** Get gas fee for transaction
   * {@params}
   *    amount: number
   *    memo?: string (Optional)
   *
   * {@returns} gas fees: GasfeeResult
   * */
  const gasFee = await ethClient.getFees(0.01)
  console.log('Fees :: ', gasFee)

  /** Transfer token to receiver address
   * {@params}
   *     amount: number
   *     recipient: address
   *     fee?: number (Optional) - Gas fee for transaction. Uses only required gas and remaining will be sent back
   *     memo?: string (Optional)
   *
   * {@returns} tx hash: string
   * */
  const hash = await ethClient.transfer({
    recipient: '0xD526D5f47f863eFf32B99bC4F9e77DdB4bD2929b',
    amount: 0.01,
  })
  console.log('Tx hash :: ', hash)

  /** Get transaction details using txHash
   * {@params}
   *    hash: string
   *
   * {@returns} tx details: EthTxData
   * */
  const txData = await ethClient.getTransactionData(
    '0x92c1b09b45c785864833834e73919e07e5c6463195b65bc7d1ee9cbd37c8dfc5',
  )
  console.log('Tx data :: ', txData)

  /** Get Ethereum Inbound address
   *
   * {@returns} Eth Inbound address: string
   * */
  const inboundAddress = await ethClient.getEthereumInboundAddress()
  console.log('Inbound Address :: ', inboundAddress)

  /** Get default liquidity pool gas fee
   *
   * {@returns} LP gas fee: number
   * */
  const LPDefaultGasFee = await ethClient.getDefaultLiquidityPoolGasFee()
  console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)

  /** Add ETH token into liquidity pool
   * {@params}
   *     amount: number
   *     inboundAddress: string // EthIBaddress (Get using getEthereumInboundAddress() method)
   *     dojAddress?: string // Optional dojima address. Better to pass doj address but not mandatory
   *
   * {@returns} liquidity pool hash: string
   * */
  const liquidityPoolHash = await ethClient.addLiquidityPool(
    1,
    inboundAddress,
    // 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km',     // optional
  )
  console.log('Liquidity pool hash : ', liquidityPoolHash)

  /** Swap token from liquidity pool to receiver address
   * {@params}
   *     amount: number
   *     token: SwapAssetList     (Ex: AR.AR, DOT.DOT, D11K.DOJ, SOL.SOL)
   *     inboundAddress: string // SolIBaddress (Get using getArweaveInboundAddress() method)
   *     recipient: string (Dojima address)
   *
   * {@returns} tx hash: string
   * */
  // const d11kswapHash = await ethClient.swap(1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
  // console.log('Swap tx hash : ', d11kswapHash)
  // const arswapHash = await ethClient.swap(5,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
  // console.log('Swap tx hash : ', arswapHash)
  // const dotswapHash = await ethClient.swap(3,'DOT.DOT', inboundAddress, '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
  // console.log('DOT Swap tx hash : ', dotswapHash)
  const solswapHash = await ethClient.swap(3, 'SOL.SOL', inboundAddress, 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS')
  console.log('SOL Swap tx hash : ', solswapHash)

  // /** Create Client instance
  //  *  {@params}
  //  *    'seed-phrase' and 'network'
  //  *    etherscanApiKey: string (Api key provided by 'Etherscan' for api calls. Sign up for getting one)
  //  *    ethplorerApiKey: string (Api key provided by 'Ethplorer' for api calls. Sign up for getting one)
  //  */
  // const ethClient = new EthereumClient({
  //   phrase,
  //   network: Network.Testnet,
  //   etherscanApiKey: '6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C',
  //   ethplorerApiKey: 'EK-aUaYx-fDc6bNC-WfsGG',
  // })
  //
  // /** Generate Address for phrase
  //  *
  //  *  {@returns} address: string
  //  *  */
  // const address = ethClient.getAddress()
  // console.log('Address :: ', address)
  //
  // /** Get token balance of address
  //  * {@params} address: string
  //  *
  //  * {@returns} balance: number
  //  * */
  // const bal = await ethClient.getBalance('0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4')
  // const balance = baseToAsset(bal[0].amount).amount()
  // console.log('Balance :: ', balance.toNumber())
  //
  // /** Get transaction details using txHash
  //  * {@params}
  //  *    txHash: string
  //  * {@returns} tx details: 'Tx'
  //  * */
  // const data = await ethClient.getTransactionData(
  //   '0x9ad4e1501ea6d1fba141de33f523dc907b2c51ef4a1eaf583e297f6881e3d235'
  // )
  // console.log('Tx data : ', data)
  //
  // /** Get gas fee for transaction
  //  * {@params}
  //  *    amount: number     Note: convert amount to 'BaseAmount' before passing to transfer function
  //  *    recipient: string (Any address)
  //  *
  //  * {@returns} gas fees: FeesWithGasPricesAndLimits ---> ({fees: Fees, gasPrices: GasPrices, gasLimit: BigNumber})
  //  * */
  // const amt = assetToBase(assetAmount(0.0000001, ETH_DECIMAL))
  // const fees = await ethClient.estimateFeesWithGasPricesAndLimits({
  //   amount: amt,
  //   recipient: '0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4',
  // })
  // console.log(`
  //       Fees average : ${baseToAsset(fees.fees.average).amount()},
  //       gas limits: ${fees.gasLimit},
  //       gas prices average: ${baseToAsset(fees.gasPrices.average).amount()}
  //   `)
  //
  // /** Get transaction history of address
  //  * {@params}
  //  *     address: Address // Address to get history for
  //  *     offset?: number // Optional Offset
  //  *     limit?: number // Optional Limit of transactions
  //  *     asset?: string (Note: For now asset is empty) // Optional asset contract address
  //  *
  //  * {@returns} txs history: TxsPage
  //  * */
  // const txs = await ethClient.getTransactions({ address: '0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4' })
  // console.log('Txs : ', txs)
  //
  // /** Transfer token to receiver address
  //  * {@params}
  //  *     amount: number     Note: convert amount to 'BaseAmount' before passing to transfer function
  //  *     recipient: address
  //  *     memo?: string // optional memo to pass
  //  *     feeOption?: FeeOption // optional feeOption. Default set to fast
  //  *     gasPrice?: number   // optional (Note: convert amount to 'BaseAmount' before passing to transfer function)
  //  *     gasLimit?: BigNumber
  //  *
  //  * {@returns} tx hash: string
  //  * */
  // const amount = assetToBase(assetAmount(0.0000001, ETH_DECIMAL))
  // const hash = await ethClient.transfer({
  //   amount,
  //   recipient: '0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4',
  // })
  // console.log('Tx hash : ', hash)
}

;(async () => {
  await checkEth()
})()
