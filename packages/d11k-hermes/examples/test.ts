import { Network } from '@d11k-ts/client'
import { DOJ_DECIMAL, HermesClient } from '@d11k-ts/hermes'
import { AssetDOJNative, assetAmount, assetToBase, baseToAsset } from '@d11k-ts/utils'

async function TestHermes() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params} 'seed-phrase' and 'network'
   */
  const hermesClient = new HermesClient({ phrase, network: Network.Testnet })

  /** Generate Address for phrase
   *
   *  {@returns} address: string
   *  */
  const address = hermesClient.getAddress()
  console.log('Address :: ', address)

  /** Get token balance of address
   * {@params} 'address' and 'token asset'
   *
   * {@returns} balance: number
   * */
  const bal = await hermesClient.getBalance('dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje', [AssetDOJNative])
  const balance = baseToAsset(bal[0].amount).amount()
  console.log('Balance :: ', balance.toNumber())

  /** Get transaction details using txHash
   * {@params} 'txHash' and 'address'
   * {@returns} tx details: 'Tx'
   * */
  const data = await hermesClient.getTransactionData(
    '6067CAC67EC27477B48C67237198964FFCD8FBC2F5C0CECA075D278192B45A1B',
    'dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje',
  )
  console.log('Tx data : ', data)

  /** Get gas fee for transaction
   *
   * {@returns} gas fees: Fees
   * */
  const fees = await hermesClient.getFees()
  console.log('Fees : ', fees.fastest.amount().toNumber())

  /** Get transaction history of address
   * {@params}
   *     address: Address // Address to get history for
   *     offset?: number // Optional Offset
   *     limit?: number // Optional Limit of transactions
   *
   * {@returns} txs history: TxsPage
   * */
  const txs = await hermesClient.getTransactions({ address: 'dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje' })
  console.log('Txs : ', txs)

  /** Transfer token to receiver address
   * {@params}
   *     amount: number     Note: convert amount to 'BaseAmount' before passing to transfer function
   *     recipient: address
   *     memo?: string // optional memo to pass
   *
   * {@returns} tx hash: string
   * */
  const amount = assetToBase(assetAmount(0.1, DOJ_DECIMAL))
  const hash = await hermesClient.transfer({ amount, recipient: 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km' })
  console.log('Tx hash : ', hash)

  /** Deposit doj token
   * {@params}
   *     amount: number     Note: convert amount to 'BaseAmount' before passing to transfer function
   *     memo: string
   *           'ADD:{SwapAssetList}:{respective-token-address}'
   *           'SWAP:{SwapAssetList}:{receiver-token-address}'
   *
   *  {@returns} deposit tx hash: string
   */
  // 'memo' with ADD
  const depositHash = await hermesClient.deposit({
    amount,
    memo: `ADD:AR.AR:7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4`,
  })
  // 'memo' with SWAP
  // const depositHash = await hermesClient.deposit({
  //   amount,
  //   memo: `SWAP:AR.AR:7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4`,
  // })
  console.log('Deposit tx hash :: ', depositHash)
}

;(async () => {
  await TestHermes()
})()
