const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const balanceRepository = require('../repositories/balance.repository')
const api = express.Router()

// 5. Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
// Status: Done.
api.post('/deposit/:userId', getProfile, async (req, res) => {
    const profile_id = req.get('profile_id')
    const deposit_value = req.body.value
    
    const profile = await balanceRepository.getProfile(profile_id)
    if(profile.type != 'client'){
        res.status(400).json({message: 'Only clients can make deposits!'})
        return
    }

      const amount_due = await balanceRepository.getAmountJobsToPay(profile_id)
      const percent = ( deposit_value / amount_due) * 100

      if(percent < 25){
        await balanceRepository.addBalance(profile_id, deposit_value)
        res.json({message: 'The amounts have been deposited.'})
      }else{
        res.status(400).json({message: 'The value is more than 25% his total of jobs to pay.'})
      }
})

module.exports = api