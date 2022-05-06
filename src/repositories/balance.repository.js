const { sequelize, Profile, Job, Contract } = require('../model')

const getProfile = async profileId => await Profile.findOne({ where: { id: profileId } })

const getAmountJobsToPay = async profile_id => {
  const jobs = await Job.findAll({
    include: [{
        model: Contract,
        attributes: [ [sequelize.fn('count'), 'jobs'] ],
        where: {ClientId: profile_id}
    }],
    attributes: [ [sequelize.fn('sum', sequelize.col('price')), 'total']],
    where: {paid: null}
  });
  return jobs[0].dataValues.total
}

const addBalance = async (profileId, deposit_value) => {
  await Profile.increment({balance: deposit_value}, {where: {id: profileId}})
}

module.exports = {
  getProfile,
  addBalance,
  getAmountJobsToPay,
}
