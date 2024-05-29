const serviceUserRouter = require('express').Router()
const ServiceUser = require('../models/serviceUser')


serviceUserRouter.post('/', async (request, response) => {
    const serviceUser = new ServiceUser(request.body)
    const savedServiceUser = await serviceUser.save()
    response.json(savedServiceUser)
})

serviceUserRouter.get('/', async (request, response) => {
    const serviceUsers = await ServiceUser.find({})
    response.json(serviceUsers)
})

serviceUserRouter.get('/:id', async (request, response) => {
    const email = request.params.id
    const serviceUser = await ServiceUser.findOne({ email })
    .populate('applied')
    .populate('current')
    .populate('history')
    if (serviceUser) {
        response.json(serviceUser)
    }
    else {
        response.status(404).end()
    }
})

serviceUserRouter.delete('/:id', (request, response) => {
    // ServiceUser.findByIdAndRemove(request.params.id)
    ServiceUser.deleteOne({email:request.params.id})
        .then(response.status(204).end())
})


serviceUserRouter.put('/:id', (request, response) => {
    const serviceUser = request.body
    ServiceUser.findByIdAndUpdate(request.params.id, serviceUser, { new: true })
        .then(updatedUser => {
            response.json(updatedUser)
        })
        .catch(error => next(error))
})


module.exports = serviceUserRouter