require("dotenv").config()
const mariadb = require("mariadb")
const { logger } = require("../Config/winston")
const pool = mariadb.createPool({ host           : process.env.MARIA_HOST, 
                                  user           : process.env.MARIA_USER,
                                  password       : process.env.MARIA_PW,
                                  database       : process.env.MARIA_DB,
                                  connectionLimit: 3
                               })

let mariaConn 

const setConn = async () => { return await pool.getConnection() } 

function MariaConn() { 
    return new Promise( ( reslove, reject ) => { 
        try {
            mariaConn = setConn() 
            reslove( mariaConn )
            logger.info("mariadb connection successful.")
        }
        catch (err) {
            reject(err)
        }
    })
}

const MariaQuery = async( args ) => { 
    try { 
        return await mariaConn.query( args )

    } catch( err ) { 
        logger.warn("failed to query " + args + " " + err )
        mariaConn.release()
    }
    finally{
        if ( mariaConn ) mariaConn.release()
    }
}

module.exports = { 
    MariaQuery,
    MariaConn
}