const express    = require("express")
const app        = express() 
const bodyParser = require("body-parser")
const routes     = require("./Api")
const https      = require("https")
const config     = require("./Config/config.json")
const cors       = require("cors")
const fs         = require("fs")
const morgan     = require("morgan")
const { logger } = require("./Config/winston")
const { stream } = require("./Config/winston")

require("dotenv").config()

const certs = { 
    key:  fs.readFileSync("cert-key.key"),
    cert: fs.readFileSync("cert-crt.crt")
}

app.set( "trust proxy", true)
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( express.urlencoded({ extended: true }))
app.use( express.json() )
app.use( cors() )
app.use( morgan("combined", { stream }))
app.use( "api/", routes )

try { 
    https.createServer( certs, app ).listen( process.env.NODE_PORT, () => {
        logger.info( "listen on " + process.env.NODE_PORT )
    } )
} catch ( err ) { 
    logger.info( "failed to create listen server. on " + process.env.NODE_PORT  )
}