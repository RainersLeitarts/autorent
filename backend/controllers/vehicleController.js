const Vehicle = require('../models/vehicle')

const getVehicle = async (req, res, next) => {
    let vehicle

    try {
        vehicle = await Vehicle.findById(req.params.id)
        
        if(vehicle == null) {
            return res.status(404).json({message: 'Cannot find vehicle with id: ' + req.params.id})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.vehicle = vehicle
    next()
}

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find()
        res.json(vehicles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSingleVehicle = async (req, res) => {
    res.json(res.vehicle)
}

const createVehicle = async (req, res) => {
    const vehicle = new Vehicle({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year
    })

    try {
        const newVehicle = await vehicle.save()
        res.status(201).json(newVehicle)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateVehicle = async (req, res) => {
    if (req.body === null) return res.status(400).json({ message: "Empty request body" })

    for (argument in req.body) {
        res.vehicle[argument] = req.body[argument]
    }

    try {
        const updatedVehicle = await res.vehicle.save()
        res.json(updatedVehicle)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const vehicleId = res.vehicle.id
        await res.vehicle.remove()
        res.json({ message: 'Deleted vehicle with id: ' + vehicleId })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getVehicle,
    getAllVehicles,
    getSingleVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
}