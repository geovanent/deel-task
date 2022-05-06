const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const { sequelize, Profile, Job, Contract } = require('../model')
const jobRepository = require('../repositories/job.repository');
const api = express.Router()

// 3. Get all unpaid jobs for a user (either a client or contractor), for active contracts only.
// Status: Done.
api.get('/unpaid/', getProfile, async (req, res) => {
  profile_id = req.get('profile_id')

  const unpaid_jobs = await jobRepository.getUnpaidJobs(profile_id)

  if(unpaid_jobs.length < 1) return res.status(404).end()
  res.json(unpaid_jobs)
})


// 4. Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.
// Status: Done
api.post('/:job_id/pay/', getProfile, async (req, res) => {
  const job_id = req.params['job_id']
  const profile_id = req.get('profile_id')

  const profile = await jobRepository.getProfile(profile_id)
  if(profile.type != 'client'){
    res.status(400).json({message: 'Only clients can make payments!'})
    return
  }

  const job = await jobRepository.getJob(job_id)
  
  if(!job || job.paid != null){
      res.status(404).json({message: 'Job not found or already paid!'})
      return
  }

  if(profile.balance <= job.price){
    res.status(400).json({message: 'You do not have the balance available for this transaction!'})
    return
  }

  const payJobResult = await jobRepository.setJobPaid(job, profile_id, job.Contract.ContractorId)
  if(!payJobResult) res.status(500).json({message: 'An error occurred while trying to persist to the database.!'})


  res.json({ message: 'Job paid successfully!'})
})

module.exports = api