const { AppError } = require('../shared/app.error')

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    })
  }
  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message} `,
  })
}

module.exports = { errorHandler }
