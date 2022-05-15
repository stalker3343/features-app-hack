import Web3 from 'web3'
import { useAuthStore } from '@/stores/auth.js'
export default async (ctx, inject) => {
  let web3
  if (process.server) {
    web3 = new Web3('ws://localhost:7545')
    inject('web3', web3)
    return
  }

  if (window.ethereum) {
    try {
      const store = useAuthStore(ctx.$pinia)

      // Request account access
      const users = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      store.user = users[0]
      window.ethereum.on('accountsChanged', (accounts) => {
        store.user = accounts[0]
      })

      // We are in the browser and web3 provider has been injected (probably by Metamask)
      // Issue: https://github.com/ethereum/web3.js/issues/2640
      // Use transactionConfirmationBlocks
      web3 = new Web3(window.ethereum, null, {
        transactionConfirmationBlocks: 1,
      })
    } catch (error) {
      console.log(error)
      alert('Please, allow Metamask access to your account')
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
  } else {
    alert('Please, install metamask')
  }
  inject('web3', web3)
}
