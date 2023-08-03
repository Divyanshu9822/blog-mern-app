const express = require('express')

const router = express.Router()
const validateToken = require('../middleware/validateTokenHandler')

const { registerUser, loginUser, currentUser, getUser } = require('../controllers/usersController')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', validateToken, currentUser)

router.get('/:id', getUser)


module.exports = router