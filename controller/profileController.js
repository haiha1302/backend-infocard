const { dbProfile } = require('../database')

const getUserProfile = async (req, res) => {
    console.log(req.body);
    const checkExistedProfile = await dbProfile.profiles.findOne({
        idUserMongo: req.params.idUser
    })

    if (!checkExistedProfile) {
        throw new Error('Profile does not exist!!!')
    }
    
    return checkExistedProfile
}

const getUserProfileImage = async (req, res) => {
    const checkExistedProfile = await dbProfile.profiles.findOne({
        image: req.params.image
    })

    if (!checkExistedProfile) {
        throw new Error('Profile does not exist!!!')
    }

    return checkExistedProfile.image
}

const postNewUserProfile = async (req, res) => {
    try {
        const profileData = {
            nameUser: req.body.nameUser,
            image: req.file.filename,
            nameCard: req.body.nameCard,
            colorCard: req.body.colorCard,
            qrImage: req.body.qrImage,
            socials: req.body.socials,
            idUserMongo: req.body.idUserMongo
        }

        await dbProfile.profiles.insertOne(profileData, (err, rows) => {
            if (err) {
                res.send({ message: 'An error occurred' })
            } else {
                res.json({
                    status: 'Successfully create',
                    success: 1,
                    avatarUrl: `http://localhost:5000/profile/avatar/${req.file.filename}`
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUserProfile, getUserProfileImage, postNewUserProfile }