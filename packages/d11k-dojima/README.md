# `@d11k-ts/dojima`

## Modules

- `client` - Custom client for communicating with Dojima by using [`web3`](https://github.com/ethereum/web3.js) and [`ethers`](https://github.com/ethers-io/ethers.js)

## Installation

```
yarn add @d11k-ts/dojima
```

## Documentation : Basic usage examples

### Connect wallet to new DojimaClient

- Create new DojimaClient client
- Network default is `Mainnet`
- InfuraApiKey: Optional (Api key provided by 'Infura' for mainnet calls. Sign up for getting one)

```ts
// Imports
import {Network} from '@d11k-ts/client'
import {DojimaClient} from '@d11k-ts/dojima'

//Connect wallet, validate address and check balance 
const connectWallet = async () => {
  let phrase = "phrase"
  // Mainnet
  const dojClient = new DojimaClient({
    phrase
  })
  // testnet
  // const dojClient = new DojimaClient({ 
  //    phrase, 
  //    network: Network.Testnet,
  //    rpcUrl: 'https://api-test.d11k.dojima.network:8545/',
  //  })
  let address = dojClient.getAddress()
  try {
    const balance = await dojClient.getBalance(address)
    console.log(`Adress: ${address} with balance ${balance}`)

  } catch (error) {
    console.log(`Caught: ${error} `)
  }
}
```

### Transfer doj using DojimaClient

- Create new DojimaClient instance
- Returns txHash as string
- Note: Uses only required gas for Tx and remaining will be sent back

```ts
const transferDoj = async () => {
  // First initiate DojimaClient
  let amount = 0.001
  let recipient = 'insert address'
  console.log("Building transaction")
  try {
    const txid = await dojClient.transfer({
      amount,
      recipient,
      // fee: number,  // optional. Calculated by default(if not provided) based on input amount.
      // memo: string,  // optional
    })
    console.log(`Transaction sent: ${txid}`)
    return txid
  } catch (error) {
    console.log(`Caught: ${error} `)
  }
}
```

### Get transaction Data

- Create new DojimaClient instance
- Call getTransactionData(hash) returns hash-details

```ts
// Retrieve transaction data for a particular hash
const transactionData = async () => {
  let hash = "insert hash"
  try {
    const txData = await dojClient.getTransactionData(
      hash,
    )
    console.log(`Transaction data ${txData}`)
  } catch (error) {
    console.log(`Caught: ${error} `)
  }
}
```

### Get transfer Fees estimations

- Retrieve estimated gas fees from dojima client

```ts
// Retrieve fee estimations from transaction parameters
const feeEstimations = async () => {
  let amountToTransfer = 0.001
  try {
    const fees = await dojClient.gasFees({
      amount: amount,
      // memo: string          // optional
    })
    console.log(`Fees : ${fees}`)

  } catch (error) {
    console.log(`Caught: ${error} `)
  }
}
```

### Example Code

For sample code check out example test case in `./examples/test.ts`