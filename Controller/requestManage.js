const { STATUS_CODE } = require("../Common/const")
const { logger } = require("../Config/winston")

const sendResponse = ( ( res, args ) => {

    if ( args["status"] > 399) logger.info( args["meesage"] )
    res.status( args["status"] ).json( { "message": args["message"], "data": args["data"] })
})

module.exports = { 
    sendResponse
}