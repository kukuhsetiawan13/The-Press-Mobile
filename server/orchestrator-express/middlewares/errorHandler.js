const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = 'Internal Server Error'
    console.log(err)


    if(err.response.data.message) {
      const error = err.response.data.message
      if(typeof error === 'string') {
        code = err.response.status
        message = error
      } else if (typeof error === 'object') {
        code = err.response.status
        message = error[0]
      }
    } else {
      code = 404
      message = 'Not Found'
    }
  	

    res.status(code).json({message})
  }

  module.exports = {errorHandler}
