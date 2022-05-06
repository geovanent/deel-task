const { Op } = require('sequelize')
const { Contract } = require('../model')

const getContractById = async (id, profileId) => await Contract.findOne({ where: { id, [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }] } })

const listNonTerminatedContracts = async (profileId) => await Contract.findAll({
  where: {
    Status: {
      [Op.ne]: 'terminated',
    },
    [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
  },
});

module.exports = {
  getContractById,
  listNonTerminatedContracts,
};