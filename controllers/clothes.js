const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

//Post /clothes -- create a new clothing
router.post("/", async (req, res) => {
	try {
		//create the clothes in bd
		const newClothes = await db.Clothes.create(req.body)
		res.status(201).json(newClothes)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

router.put("/id", async (req, res) => {
	try {
		//get id from url params
		const id = req.params.id
		//search for the id in the db, and update the req.body
		const options = { new: true } //return the updated bounty to us
		const updatedClothes = await db.Clothes.findByIdAndUpdate(
			id,
			req.body,
			options
		)
		//the update bounty back to client
		res.json(updatedClothes)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

router.delete("/:id", async (res, req) => {
	try {
		//get id of specific clothes form the params
		const id = req.params.id
		//find and delete the clothes from bd
		const deletedClothes = await db.Clothes.findByIdAndDelete(id)
		//send no content status
		res.sendStatus(204)
	} catch (error) {
		//use status
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})
module.exports = router