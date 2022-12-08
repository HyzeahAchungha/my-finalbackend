
const express = require('express')

// controller functions
const { loginUser, signupUser, getAllUsers } = require('../controllers/userController')

const router = express.Router()

// login route

router.post('/login', loginUser)




// signup route
router.post('/signup', signupUser);

router.get("/get-all-users", getAllUsers);

module.exports = router   