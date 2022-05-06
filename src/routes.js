const express = require('express')
const router = express.Router()

// Controllers
jobController = require("./controllers/job.controller");
contractController = require("./controllers/contract.controller")
balanceController = require("./controllers/balance.controller")
adminController = require("./controllers/admin.controller")


// Routes
router.use('/jobs', jobController)
router.use('/contracts', contractController)
router.use('/balances', balanceController)
router.use('/admin', adminController)

module.exports = router