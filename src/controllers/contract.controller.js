const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const api = express.Router()
const contractRepository = require('../repositories/contract.repository')

// 1. This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!
// Status: Done
api.get('/:id', getProfile, async (req, res) => {
  profile_id = req.get('profile_id')
  const { id } = req.params

  const contract = await contractRepository.getContractById(id, profile_id)

  if (!contract) return res.status(404).end()
  res.json(contract)
})

// 2. Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.
// Status: Done.
api.get('/', getProfile, async (req, res) => {
  profile_id = req.get('profile_id')
  const contracts = await contractRepository.listNonTerminatedContracts(profile_id)

  if (contracts.length < 1) return res.status(404).end()
  res.json(contracts)
})

module.exports = api
