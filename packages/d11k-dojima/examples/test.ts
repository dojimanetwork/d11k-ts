import { Network } from '@d11k-ts/client'
import { DojimaClient } from '@d11k-ts/dojima'

async function checkDoj() {
  /** Note: Mentioned seed phrase is only for testing purpose */
  const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'

  /** Create Client instance
   *  {@params}
   *    'seed-phrase' and 'network'
   *    for DojTestnet/devnet/testnet pass {
   *      endpoint: 'https://api-test.d11k.dojima.network:8545/'
   *    }
   *    infuraApiKey: string, Optional (Api key provided by 'Infura' for mainnet calls. Sign up for getting one)
   */
  const dojClient = new DojimaClient({
    phrase,
    network: Network.DojTestnet,
    rpcUrl: 'https://api-test.d11k.dojima.network:8545/',
  })

  /** Generate Address for phrase
   *
   *  {@returns} address: string
   *  */
  const address = dojClient.getAddress()
  console.log('Address :: ', address)

  /** Get token balance of address
   * {@params} address: string
   *
   * {@returns} balance: number
   * */
  const balance = await dojClient.getBalance(address)
  console.log('Balance :: ', balance)

  /** Get gas fee for transaction
   * {@params}
   *    amount: number
   *    memo?: string (Optional)
   *
   * {@returns} gas fees: GasfeeResult
   * */
  const gasFee = await dojClient.getFees(0.01)
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
  const hash = await dojClient.transfer({
    recipient: '0xD526D5f47f863eFf32B99bC4F9e77DdB4bD2929b',
    amount: 0.01,
  })
  console.log('Tx hash :: ', hash)

  /** Get transaction details using txHash
   * {@params}
   *    hash: string
   *
   * {@returns} tx details: DojTxData
   * */
  const txData = await dojClient.getTransactionData(
    '0x6fa8ae201698a87b4694f7b1da142f7d6f34e6eaa84eedecce6e291d0c9976f1',
  )
  console.log('Tx data :: ', txData)
}

;(async () => {
  await checkDoj()
})()
