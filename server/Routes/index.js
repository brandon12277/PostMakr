const express  =require("express")
const bodyParser = require("body-parser")
const upload = require("../config/multerconnfig")


const  userController = require("./../Controller/userController")
const  postController = require("./../Controller/postController")

const router = express.Router()



router.post("/createUser",upload.single('file'),userController.createUser)


router.route("/Login")
.post(userController.validateUserCredentials)



router.route("/MakePost")
.post(postController.MakePost)

router.route("/CheckToken")
.post(userController.CheckUserToken)

router.route("/GetPosts")
.get(postController.GetPosts)



module.exports = router