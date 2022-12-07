import { BinanceBeaconClient } from '@d11k-ts/binance-beacon'
import { Network } from '@d11k-ts/client'
import { AssetBNB, assetAmount, assetToBase, baseToAsset } from '@d11k-ts/utils'

async function TestBnbBeacon() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'female hidden they what snack exist become vast method law moon decrease'

  /** Create Client instance
   *  {@params} 'seed-phrase' and 'network'
   */
  const bnbClient = new BinanceBeaconClient({ phrase, network: Network.Testnet })

  /** Generate Address for phrase
   *
   *  {@returns} address: string
   *  */
  const address = bnbClient.getAddress()
  console.log('Address :: ', address)

  /** Get token balance of address
   * {@params} 'address' and 'token asset'
   *
   * {@returns} balance: number
   * */
  const bal = await bnbClient.getBalance('tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va', [AssetBNB])
  const balance = baseToAsset(bal[0].amount).amount()
  console.log('Balance :: ', balance.toNumber())

  /** Get transaction details using txHash
   * {@params} 'txHash'
   * {@returns} tx details: 'Tx'
   * */
  const data = await bnbClient.getTransactionData('F1DD0E719D5238CE2AC55CAFAA11126D4563DF3622FB2DC6B4E7E784A25B5238')
  console.log('Tx data : ', data)

  /** Get gas fee for transaction
   *
   * {@returns} gas fees: Fees
   * */
  const fees = await bnbClient.getFees()
  console.log('Fees : ', fees.fastest.amount().toNumber())

  /** Get transaction history of address
   * {@params}
   *     address: Address // Address to get history for
   *     offset?: number // Optional Offset
   *     limit?: number // Optional Limit of transactions
   *     startTime?: Date // Optional date
   *     asset?: token Asset (AssetBNB) // Optional asset
   *
   * {@returns} txs history: TxsPage
   * */
  const txs = await bnbClient.getTransactions({ address: 'tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va' })
  console.log('Txs : ', txs)

  /** Transfer token to receiver address
   * {@params}
   *     amount: number     Note: convert amount to 'BaseAmount' before passing to transfer function
   *     recipient: address
   *     memo?: string // optional memo to pass
   *
   * {@returns} tx hash: string
   * */
  const amount = assetToBase(assetAmount(0.0001, 8))
  const hash = await bnbClient.transfer({ amount, recipient: 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu' })
  console.log('Tx hash : ', hash)
}

;(async () => {
  await TestBnbBeacon()
})()
