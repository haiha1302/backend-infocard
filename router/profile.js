const express = require('express')
const multer = require('multer')
const { getUserProfile, getUserProfileImage, postNewUserProfile } = require('../controller/profileController')

const router = express.Router()

const storage = multer.diskStorage({
    destination: './Images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
})

const uploads = multer({
    storage: storage
})

router.get('/user/:idUser', getUserProfile)

router.get('/:image', getUserProfileImage)

router.post('/create/:id', uploads.single('image'), postNewUserProfile)

module.exports = router