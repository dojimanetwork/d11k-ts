import { BinanceBeaconClient } from '@d11k-ts/binance-beacon'
import { Network } from '@d11k-ts/client'
import { AssetBNB, assetAmount, assetToBase, baseToAsset } from '@d11k-ts/utils'

async function TestBnbBeacon() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params} 'seed-phrase' and 'network'
   *   For 'doj-testnet add this along with phrase
   *   network: Network.DojTestnet,
   *   dojClientUrl: 'https://bnb-test.h4s.dojima.network'
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
  const bal = await bnbClient.getBalance('tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu', [AssetBNB])
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
  const txs = await bnbClient.getTransactions({ address: 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu' })
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
  const hash = await bnbClient.transfer({ amount, recipient: 'tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va' })
  console.log('Tx hash : ', hash)

  /** Get Binance Inbound address
   *
   * {@returns} BNB Inbound address: string
   * */
  const inboundAddress = await bnbClient.getBinanceInboundAddress()
  console.log('Inbound Address :: ', inboundAddress)

  /** Get default liquidity pool gas fee
   *
   * {@returns} LP gas fee: number
   * */
  const LPDefaultGasFee = await bnbClient.getDefaultLiquidityPoolGasFee()
  console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)

  /** Add BNB token into liquidity pool
   * {@params}
   *     amount: number
   *     inboundAddress: string // ArIBaddress (Get using getBinanceInboundAddress() method)
   *     dojAddress?: string // Optional dojima address. Better to pass doj address but not mandatory
   *
   * {@returns} liquidity pool hash: string
   * */
  const liquidityPoolHash = await bnbClient.addLiquidityPool(
    1,
    inboundAddress,
    // 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km',   // optional
  )
  console.log('Liquidity pool hash : ', liquidityPoolHash)

  /** Swap token from liquidity pool to receiver address
   * {@params}
   *     amount: number
   *     token: SwapAssetList     (Ex: AR.AR, DOT.DOT, D11K.DOJ, ETH.ETH, SOL.SOL)
   *     inboundAddress: string // BNBIBaddress (Get using getBinanceInboundAddress() method)
   *     recipient: string (respective recipient token address)
   *
   * {@returns} tx hash: string
   * */
  const arswapHash = await bnbClient.swap(5, 'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
  console.log('AR Swap tx hash : ', arswapHash)
  // const d11kswapHash = await bnbClient.swap(0.1, 'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
  // console.log('D11K Swap tx hash : ', d11kswapHash)
  // const dotswapHash = await bnbClient.swap(3, 'DOT.DOT', inboundAddress, '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
  // console.log('DOT Swap tx hash : ', dotswapHash)
  // const ethswapHash = await bnbClient.swap(3, 'ETH.ETH', inboundAddress, '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
  // console.log('ETH Swap tx hash : ', ethswapHash)
  // const solswapHash = await bnbClient.swap(3, 'SOL.SOL', inboundAddress, 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS')
  // console.log('SOL Swap tx hash : ', solswapHash)
}

;(async () => {
  await TestBnbBeacon()
})()
