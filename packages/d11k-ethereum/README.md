# `@d11k-ts/ethereum`

## Modules

- `client` - Custom client for communicating with Ethereum by using [`web3`](https://github.com/ethereum/web3.js) and [`ethers`](https://github.com/ethers-io/ethers.js)

## Installation

```
yarn add @d11k-ts/ethereum
```

## Documentation : Basic usage examples

### Connect wallet to new EthereumClient

- Create new EthereumChain client
- Network default is `Mainnet`
- InfuraApiKey: Optional (Api key provided by 'Infura' for mainnet calls. Sign up for getting one)

```ts
// Imports
import {Network} from '@d11k-ts/client'
import {EthereumClient} from '@d11k-ts/ethereum'

//Connect wallet, validate address and check balance 
const connectWallet = async () => {
  let phrase = "phrase"
  // Mainnet
  const ethClient = new EthereumClient({
    phrase
  })
  // testnet
  // const ethClient = new EthereumClient({ 
  //    phrase,
  //    network: Network.DojTestnet,
  //    rpcUrl: 'https://eth-test.h4s.dojima.network/',
  //        If above rpc url doesn't work use below one
  //    rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
  //    network: Network.Testnet,
  //    rpcUrl: 'https://goerli.infura.io/v3/',
  //    infuraApiKey: '***********************',
  //  })
  let address = ethClient.getAddress()
  try {
    const balance = await ethClient.getBalance(address)
    console.log(`Adress: ${address} with balance ${balance}`)

  } catch (error) {
    console.log(`Caught: ${error} `)
  }
}
```

### Transfer eth using EthereumClient

- Create new EthereumClient instance
- Returns txHash as string
- Note: Uses only required gas for Tx and remaining will be sent back

```ts
const transferEth = async () => {
  // First initiate EthereumClient
  let amount = 0.001
  let recipient = 'insert address'
  console.log("Building transaction")
  try {
    const txid = await ethClient.transfer({
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

- Create new EthereumClient instance
- Call getTransactionData(hash) returns hash-details
- Call getTransactionsHistory(address) returns list of transactions (if any)
- Get 'Etherscan' api key for txs list
- Note : DojTestnet doesn't provide txs list

```ts
// Retrieve transaction data for a particular hash
const transactionData = async () => {
  let hash = "insert hash"
  try {
    const txData = await ethClient.getTransactionData(
      hash,
    )
    console.log(`Transaction data ${txData}`)
  } catch (error) {
    console.log(`Caught: ${error} `)
  }
}

// Retrieve transaction history for a particular address
const transactionHistory = async () => {
  let Address = ethClient.getAddress()
  try {
    const txHistory = await ethClient.getTransactionsHistory({
      address: Address,
      apiKey: '********',
    })
    console.log(`Found ${txHistory.total.toString()}`)
    txHistory.txs.forEach(tx => console.log(tx))
  } catch (error) {
    console.log(`Caught: ${error} `)
  }
}

```

### Get transfer Fees estimations

- Retrieve estimated gas fees from ethereum client

```ts
// Retrieve fee estimations from transaction parameters
const feeEstimations = async () => {
  let amountToTransfer = 0.001
  try {
    const fees = await ethClient.gasFees({
      amount: amount,
      // memo: string          // optional
    })
    console.log(`Fees : ${fees}`)

  } catch (error) {
    console.log(`Caught: ${error} `)
  }
}
```

### Add ETH token into liquidity pool

- Add ETH tokens into liquidity pool
- Get Ethereum Inbound address from hermes chain

```ts
const addETHToLiquidityPool = async () => {
  let amountToTransfer = 0.001
  const inboundAddress = await ethClient.getEthereumInboundAddress()
  try {
    const liquidityPoolHash = await ethClient.addLiquidityPool(
      amountToTransfer,
      inboundAddress,
      dojAddress,           // optional dojima address
    )
    console.log('Liquidity pool hash : ', liquidityPoolHash)
  } catch (error) {
    console.log(`Caught ${error}`)
  }
}
```

### Swap ETH tokens

- Swap ETH tokens to required token using receiver address
- Get Ethereum Inbound address from hermes chain
- Supported tokens for swapping - 'DOT', 'DOJ', 'AR', 'SOL'

```ts
import {SwapAssetList} from '@d11k-ts/utils'

const swapETH = async () => {
  let amountToTransfer = 0.001
  const inboundAddress = await ethClient.getEthereumInboundAddress()
  try {
    const swapHash = await ethClient.swap(
       amountToTransfer,
      SwapAssetList,
      inboundAddress,
      reciepient                // Respective receiver SwapAssetList token address
    )
    console.log('Swap tx hash : ', swapHash)
  } catch (error) {
    console.log(`Caught ${error}`)
  }
}
```

[//]: # (# `@d11k-ts/ethereum`)

[//]: # ()
[//]: # (## Modules)

[//]: # ()
[//]: # (- `client` - Custom client for communicating with Ethereum by using [`ethers`]&#40;https://github.com/ethers-io/ethers.js&#41;)

[//]: # ()
[//]: # (## Installation)

[//]: # ()
[//]: # (```)

[//]: # (yarn add @d11k-ts/ethereum)

[//]: # (```)

[//]: # ()
[//]: # (Following dependencies have to be installed into your project. These are not included in `@d11k-ts/ethereum`.)

[//]: # ()
[//]: # (```)

[//]: # (yarn add axios ethers)

[//]: # (```)

[//]: # ()
[//]: # (## Service Providers)

[//]: # ()
[//]: # (This package uses the following service providers:)

[//]: # ()
[//]: # (| Function                  | Service   | Notes                                                                          |)

[//]: # (| ------------------------- | --------- | ------------------------------------------------------------------------------ |)

[//]: # (| ETH balances              | Etherscan | https://etherscan.io/apis#accounts &#40;module=`account`, action=`balance`&#41;        |)

[//]: # (| Token balances            | Etherscan | https://etherscan.io/apis#tokens &#40;module=`account`, action=`tokenbalance`&#41;     |)

[//]: # (| ETH transaction history   | Etherscan | https://etherscan.io/apis#accounts &#40;module=`account`, action=`txlistinternal`&#41; |)

[//]: # (| Token transaction history | Etherscan | https://etherscan.io/apis#accounts &#40;module=`account`, action=`tokentx`&#41;        |)

[//]: # (| Transaction fees          | Etherscan | https://etherscan.io/apis#gastracker &#40;module=`gastracker`, action=`gasoracle`&#41; |)

[//]: # (| Transaction broadcast     | Etherscan | https://sebs.github.io/etherscan-api/#eth_sendrawtransaction                   |)

[//]: # (| Explorer                  | Etherscan | https://etherscan.io/                                                          |)

[//]: # ()
[//]: # (Etherscan API rate limits: https://info.etherscan.com/api-return-errors/)

[//]: # ()
[//]: # (- Testnet API - https://api-goerli.etherscan.io , Explorer - https://goerli.etherscan.io/)

[//]: # ()
[//]: # (- This package uses `etherjs` library, by default it uses several providers. &#40;`https://docs.ethers.io/v5/api-keys/`&#41;)

[//]: # ()
[//]: # (## Documentation : Basic usage examples)

[//]: # ()
[//]: # (### Connect wallet to new EthereumClient)

[//]: # ()
[//]: # (- Create new EthereumChain client)

[//]: # (- Network default is `Mainnet`)

[//]: # ()
[//]: # (```ts)

[//]: # (// Imports)

[//]: # (import {Network} from '@d11k-ts/client')

[//]: # (import {ETH_DECIMAL, EthereumClient} from '@d11k-ts/ethereum')

[//]: # (import {assetAmount, assetToBase, baseToAsset} from '@d11k-ts/utils')

[//]: # ()
[//]: # (//Connect wallet, validate address and check balance )

[//]: # (const connectWallet = async &#40;&#41; => {)

[//]: # (  let phrase = "phrase")

[//]: # (  // Mainnet)

[//]: # (  const ethClient = new EthereumClient&#40;{phrase}&#41;)

[//]: # (  // testnet)

[//]: # (  // const ethClient = new EthereumClient&#40;{ )

[//]: # (  //    phrase, )

[//]: # (  //    network: Network.Testnet,)

[//]: # (  //    etherscanApiKey: 'get-etherscan-api-key',)

[//]: # (  //    ethplorerApiKey: 'get-ethplorer-api-key',)

[//]: # (  //  }&#41;)

[//]: # (  let address = ethClient.getAddress&#40;&#41;)

[//]: # (  let isValid = ethClient.validateAddress&#40;address&#41;)

[//]: # (  console.log&#40;address&#41;)

[//]: # (  if &#40;isValid === true&#41; {)

[//]: # (    try {)

[//]: # (      const balance = await ethClient.getBalance&#40;address&#41;)

[//]: # (      let assetAmount = &#40;baseToAsset&#40;balance[0].amount&#41;&#41;.amount&#40;&#41;)

[//]: # (      console.log&#40;`Adress: ${address} with balance ${assetAmount}`&#41;)

[//]: # ()
[//]: # (    } catch &#40;error&#41; {)

[//]: # (      console.log&#40;`Caught: ${error} `&#41;)

[//]: # (    })

[//]: # (  } else {)

[//]: # (    console.log&#40;`Address: ${address} is invalid`&#41;)

[//]: # (  })

[//]: # (})

[//]: # ()
[//]: # (```)

[//]: # ()
[//]: # (### Transfer eth using EthereumClient)

[//]: # ()
[//]: # (- Create new EthereumClient instance)

[//]: # (- Convert amount to transfer to base amount)

[//]: # (- Build transaction)

[//]: # (- Returns txHash as string)

[//]: # ()
[//]: # (```ts)

[//]: # (// Transfer ethereum other TxParams > feeOptionKey?, gasLimit?, gasPrice? )

[//]: # (const transferEth = async &#40;&#41; => {)

[//]: # (  // First initiate EthereumClient)

[//]: # (  let amountToTransfer = 0.001)

[//]: # (  let recipient = 'insert address')

[//]: # (  let amount = assetToBase&#40;assetAmount&#40;amountToTransfer, ETH_DECIMAL&#41;&#41;)

[//]: # (  console.log&#40;"Building transaction"&#41;)

[//]: # (  try {)

[//]: # (    const txid = await ethClient.transfer&#40;{)

[//]: # (      amount,)

[//]: # (      recipient,)

[//]: # (      "memo": "memo",               // optional)

[//]: # (      "walletIndex": 0,             // optional &#40;default&#41;)

[//]: # (      "asset": AssetETH,            // optional &#40;default&#41;)

[//]: # (    }&#41;)

[//]: # (    console.log&#40;`Transaction sent: ${txid}`&#41;)

[//]: # (    return txid)

[//]: # (  } catch &#40;error&#41; {)

[//]: # (    console.log&#40;`Caught: ${error} `&#41;)

[//]: # (  })

[//]: # (})

[//]: # ()
[//]: # (```)

[//]: # ()
[//]: # (### Get transaction Data & transaction History)

[//]: # ()
[//]: # (- Create new EthereumClient instance)

[//]: # (- Call getTransactionData&#40;hash&#41; returns hash-details)

[//]: # (- Call getTransactions&#40;address&#41; returns list of transactions &#40;if any&#41;)

[//]: # ()
[//]: # (```ts)

[//]: # (// Retrieve transaction data for a particular hash)

[//]: # (const transactionData = async &#40;&#41; => {)

[//]: # (  let hash = "insert hash")

[//]: # (  let Address = ethClient.getAddress&#40;&#41;)

[//]: # (  try {)

[//]: # (    const txData = await ethClient.getTransactionData&#40;)

[//]: # (      hash,)

[//]: # (      Address         // optional)

[//]: # (    &#41;)

[//]: # (    console.log&#40;`Transaction data ${txData}`&#41;)

[//]: # (  } catch &#40;error&#41; {)

[//]: # (    console.log&#40;`Caught: ${error} `&#41;)

[//]: # (  })

[//]: # (})

[//]: # ()
[//]: # (// Retrieve transaction history for a particular address)

[//]: # (const transactionHistory = async &#40;&#41; => {)

[//]: # (  let Address = ethClient.getAddress&#40;&#41;)

[//]: # (  try {)

[//]: # (    const txHistory = await ethClient.getTransactions&#40;{address: Address}&#41;)

[//]: # (    console.log&#40;`Found ${txHistory.total.toString&#40;&#41;}`&#41;)

[//]: # (    txHistory.txs.forEach&#40;tx => console.log&#40;tx&#41;&#41;)

[//]: # (  } catch &#40;error&#41; {)

[//]: # (    console.log&#40;`Caught: ${error} `&#41;)

[//]: # (  })

[//]: # (})

[//]: # ()
[//]: # (```)

[//]: # ()
[//]: # (### Get transfer Fees estimations)

[//]: # ()
[//]: # (- Retrieve estimated gas prices and gas limits from ethereum client)

[//]: # ()
[//]: # (```ts)

[//]: # (// Retrieve fee estimations from transaction parameters)

[//]: # (const feeEstimations = async &#40;&#41; => {)

[//]: # (  let amountToTransfer = 0.001)

[//]: # (  let amount = assetToBase&#40;assetAmount&#40;amountToTransfer, ETH_DECIMAL&#41;&#41;)

[//]: # (  let recipient = "insert address")

[//]: # (  try {)

[//]: # (    const fees = await ethClient.estimateFeesWithGasPricesAndLimits&#40;{)

[//]: # (      "amount": amount,)

[//]: # (      "recipient": recipient)

[//]: # (    }&#41;)

[//]: # (    console.log&#40;`Fees average : ${baseToAsset&#40;fees.fees.average&#41;.amount&#40;&#41;}, gas limits: ${fees.gasLimit}, gas prices average: ${baseToAsset&#40;fees.gasPrices.average&#41;.amount&#40;&#41;}`&#41;)

[//]: # ()
[//]: # (  } catch &#40;error&#41; {)

[//]: # (    console.log&#40;`Caught: ${error} `&#41;)

[//]: # (  })

[//]: # (})

[//]: # ()
[//]: # (```)

### Example Code

For sample code check out example test case in `./examples/test.ts`