const router = require("express").Router()
const status = require("./status")

router.use("/status", status)

module.exports = router