const express = require("express")
const path = require('path')
const app = express()
const cors = require('cors')
require("../database/connection")
const userRoutes = require("../routes/user.routes")
const outgoingRoutes = require("../routes/outgoing.routes")
const receivedRoutes = require("../routes/received.routes")
const otherRoutes = require("../routes/other.routes")

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '../')));

app.use("/api/users", userRoutes)
app.use("/api/outgoing", outgoingRoutes)
app.use("/api/received", receivedRoutes)
app.use("/api/other", otherRoutes)



module.exports = app