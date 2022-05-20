const router = require("express").Router()
const v1     = require("./V1/routes")

router.use("/v1", v1)

module.exports = router