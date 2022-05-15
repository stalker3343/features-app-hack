export const loadContract = async (name, web3, networkId) => {
  const res = await fetch(`http://localhost:3000/contracts/${name}.json`)
  const Artifact = await res.json()

  let contract = null
  contract = new web3.eth.Contract(
    Artifact.abi,
    Artifact.networks[networkId].address
  )
  // } catch (error) {
  //   console.log(`Contract ${name} cannot be loaded`)
  // }

  return contract
}

// export const loadContract = async (name, provider) => {
//   const res = await fetch(`/contracts/${name}.json`)
//   const Artifact = await res.json()

//   const _contract = window.TruffleContract(Artifact)
//   _contract.setProvider(provider)

//   let deployedContract = null
//   try {
//     deployedContract = await _contract.deployed()
//   } catch {
//     console.log(`Contract ${name} cannot be loaded`)
//   }

//   return deployedContract
// }
