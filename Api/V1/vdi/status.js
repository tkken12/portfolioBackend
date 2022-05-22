const { RESPONSE_MESSAGE, STATUS, REQUEST_METHOD, STATUS_CODE } = require("../../../Common/const")
const { MariaQuery } = require("../../../Common/mariaConn")
const { sendResponse } = require("../../../Controller/requestManage")

const router = require("express").Router()

router.get("/", async( req, res ) =>{ 

    let sendData = { 
        "message": "",
        "data"   : [],
        "status" : null,
    }

    try { 
        let getStatus = await MariaQuery("SELECT * FROM guacamole_connection;")

        sendData["message"] = RESPONSE_MESSAGE[REQUEST_METHOD["GET"]][STATUS["SUCCESS"]]("vdi items")
        sendData["data"]    = getStatus
        sendData["status"]  = STATUS_CODE[200]

        sendResponse( res, sendData )
        // res.json( !!getStatus !== false ? getStatus : [] )

    } catch ( err ) {

        sendData["message"] = RESPONSE_MESSAGE[REQUEST_METHOD["GET"]][STATUS["FAIL"]]("vdi items")
        sendData["data"]    = []
        sendData["status"]  = STATUS_CODE[403]

        sendResponse( res, sendData )
    }

})

module.exports = router