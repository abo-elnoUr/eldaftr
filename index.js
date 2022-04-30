require('dotenv').config()
const app = require("./app/app")

app.listen(process.env.PORT, () => console.log(`server node start running on http://localhost:${process.env.PORT}`))