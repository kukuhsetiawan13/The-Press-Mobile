const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = 'Internal Server Error'
    console.log(err)

    if(err === 'Data not found') {
      code = 404
      message = err
    } else if (err.name === 'BSONTypeError') {
      code = 400
      message = 'Invalid User Id'
    }
  	
    res.status(code).json({message})
  }

  module.exports = {errorHandler}
