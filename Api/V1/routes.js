const router = require("express").Router()
const vdi    = require("./vdi/index")

router.use("/vdi", vdi )


module.exports = router