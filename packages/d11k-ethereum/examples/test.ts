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
   *      endpoint: 'https://eth-test.h4s.dojima.network:9545/'
   *    }
   *    infuraApiKey: string, Optional (Api key provided by 'Infura' for mainnet calls. Sign up for getting one)
   */
  const ethClient = new EthereumClient({
    phrase,
    network: Network.Testnet,
    rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
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
