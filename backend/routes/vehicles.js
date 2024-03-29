const express = require('express')
const router = express.Router()
const { getVehicle, getAllVehicles, getSingleVehicle, createVehicle,
updateVehicle, deleteVehicle } = require('../controllers/vehicleController')
const { verifyJwt } = require('../middleware/verifyJwt')


//User getVehicle to get single vehicle by id
//get all
router.get('/', getAllVehicles)
//get one
router.get('/:id', getVehicle, verifyJwt, getSingleVehicle)
//create one
router.post('/', createVehicle)
//update one
router.patch('/:id', getVehicle, updateVehicle)
//delete one
router.delete('/:id', getVehicle, deleteVehicle)


module.exports = router