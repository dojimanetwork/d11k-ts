import { BTC_DECIMAL, BitcoinClient } from '@d11k-ts/bitcoin'
import { Network } from '@d11k-ts/client'
import { AssetBTC, assetAmount, assetToBase, baseToAsset } from '@d11k-ts/utils'

async function TestBitcoin() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params} 'seed-phrase' and 'network'
   */
  const btcClient = new BitcoinClient({ phrase, network: Network.Testnet })

  /** Generate Address for phrase
   *
   *  {@returns} address: string
   *  */
  const address = btcClient.getAddress()
  console.log('Address :: ', address)

  /** Get token balance of address
   * {@params} 'address' and 'token asset'
   *
   * {@returns} balance: number
   * */
  const bal = await btcClient.getBalance('tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp', [AssetBTC])
  const balance = baseToAsset(bal[0].amount).amount()
  console.log('Balance :: ', balance.toNumber())

  /** Get transaction details using txHash
   * {@params} 'txHash'
   * {@returns} tx details: 'Tx'
   * */
  const data = await btcClient.getTransactionData('960fc663be2201df93d28ed8a97de24ca28017be8406cd1f22e0962ccd6b0726')
  console.log('Tx data : ', data)

  /** Get gas fee for transaction
   *
   * {@returns} gas fees: Fees
   * */
  const fees = await btcClient.getFees()
  console.log('Fees : ', fees.fastest.amount().toNumber())

  /** Get transaction history of address
   * {@params}
   *     address: Address // Address to get history for
   *     offset?: number // Optional Offset
   *     limit?: number // Optional Limit of transactions
   *
   * {@returns} txs history: TxsPage
   * */
  const txs = await btcClient.getTransactions({ address: 'tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp' })
  console.log('Txs : ', txs)

  /** Transfer token to receiver address
   * {@params}
   *     amount: number     Note: convert amount to 'BaseAmount' before passing to transfer function
   *     recipient: address
   *     asset: token Asset (AssetBTC)
   *     memo?: string // optional
   *              "memo too long" – Thrown if memo longer than 80 chars.
   *     feeRate?: FeeRate // optional
   *
   * {@returns} tx hash: string
   * */
  const amount = assetToBase(assetAmount(0.001, BTC_DECIMAL))
  const hash = await btcClient.transfer({
    amount,
    recipient: 'tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny',
    asset: AssetBTC,
  })
  console.log('Tx hash : ', hash)
}

;(async () => {
  await TestBitcoin()
})()
