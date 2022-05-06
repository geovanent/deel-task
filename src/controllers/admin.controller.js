const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const api = express.Router()
const jobRepository = require('../repositories/job.repository')


// 6. Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
// Status: Done.
api.get('/best-profession', getProfile, async (req, res) => {
  const start_date = new Date(req.query['start'])
  const end_date = new Date(req.query['end'])

  const jobsSumPerProfession = await jobRepository.getJobsSumPerProfession(start_date, end_date)
  console.log(jobsSumPerProfession)

  return res.json(jobsSumPerProfession)
})

// 7. returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
// Status: Done.
api.get('/best-clients', getProfile, async (req, res) => {
  const start_date = new Date(req.query['start'])
  const end_date = new Date(req.query['end'])
  const limit = req.query['limit'] || 2

  const jobsSumPerClient = await jobRepository.getPaidJobsSumPerClient(start_date, end_date, limit)

  res.json(jobsSumPerClient)
})

module.exports = api
