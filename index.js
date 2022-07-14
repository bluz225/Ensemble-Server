require("dotenv").config()
require("./models") // connect to the db
const express = require("express")
const cors = require("cors")

// app config/middlewares
const app = express()
const PORT = process.env.PORT || 7000
app.use(cors())
app.use(express.json()) //json req.bodies
// static upload folder for images
app.use(express.static("uploads"))

app.get("/", (req, res) => {
	res.send("home route")
})

// Route specific middleware
app.use("/users", require("./controllers/users"))
app.use("/tags", require("./controllers/tags"))
app.use("/outfits", require("./controllers/outfits"))
app.use("/clothes", require("./controllers/clothes"))

app.listen(PORT, () => {
	console.log(`is the PORT ${PORT} that I hear? 🌽`)
})
