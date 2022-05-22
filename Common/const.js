const STATUS_CODE = { 
    200: 200,
    201: 201,
    400: 400,
    401: 401,
    403: 403,
    404: 404
}

const STATUS = { 
    "SUCCESS": "SUCCESS",
    "FAIL"   : "FAIL"
}

const REQUEST_METHOD = { 
    "GET"   : "GET", 
    "POST"  : "POST",
    "PUT"   : "PUT",
    "DELETE": "DELETE"
}

const RESPONSE_MESSAGE = { 
    "GET" : { 
                "SUCCESS": ( args ) => { return args + " getting success."      },
                "FAIL"   : ( args ) => { return "failed to get " + args + "."  },
            },
}


module.exports = {
    STATUS_CODE,
    STATUS,
    RESPONSE_MESSAGE,
    REQUEST_METHOD,
}