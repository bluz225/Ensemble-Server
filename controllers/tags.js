const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

// /tags --GET ALL the tags
router.get("/", async (req, res) => {
	try {
		// figure out how to get current user from front end to save relationship
		const allTags = await db.Tag.find({})
		res.json(allTags)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})


// /tags --POST a tag
router.post("/", async (req, res) => {
	try {
		// Add a tag to the DB
		const newTag = await db.Tag.create(req.body) 
		// console.log("NEW TAG",newTag)
		// console.log(req.body.user)
		const user = await db.User.findById(req.body.user)
		// console.log("USER",user)
		user.tags.push(newTag)
		await user.save()
		res.status(201).json(newTag)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})
// /tags PUT tags
router.put("/", async (req,res) => {
	try {
		
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

// /tags/:id --DELETE a tag
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
	const foundTag = await db.Tag.findById(id).populate([{path: "user"}, {path: "clothes"}, {path: "outfits"}])
	// console.log("FOUND TAG", foundTag)
	const foundUser = await db.User.findById(foundTag.user._id)
	// console.log("FOUND USER", foundUser)
	const deletedTag = foundUser.tags.indexOf(foundTag._id)
	// console.log(deletedTag)
	const spliced = foundUser.tags.splice(deletedTag, 1)
	const taggedClothes = foundTag.clothes
	
	for (const clothing of taggedClothes) {
		console.log("this is clothing",clothing)
		// const foundClothing = await db.Clothes.
	}
    // await db.Tag.findByIdAndDelete(id)
    res.sendStatus(204)
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ msg: error.message })
    } else {
      res.status(500).json({ msg: "server error" })
    }
  }
})


// /tags/:id --GET specific tag
router.get("/:id", async (req, res) => {
	try {
		const tagId = req.params.id
		// figure out how to get current user from front end to save relationship
		const foundTag = await db.Tag.findById(tagId)
		res.json(foundTag)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

module.exports = router
